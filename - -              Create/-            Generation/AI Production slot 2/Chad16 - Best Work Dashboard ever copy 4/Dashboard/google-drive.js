/**
 * Google Drive Sync Module
 * Handles authentication and file save/load operations
 *
 * SETUP REQUIRED:
 * 1. Go to Google Cloud Console (console.cloud.google.com)
 * 2. Create a project and enable Google Drive API
 * 3. Create OAuth 2.0 credentials (Web application)
 * 4. Add your domain to authorized JavaScript origins
 * 5. Replace the placeholder values below with your credentials
 */

// Configuration - Replace with your actual credentials
const GOOGLE_CONFIG = {
    clientId: '908389111255-8hp20e9ohkn1ikn01fgrgfi70m21pqbn.apps.googleusercontent.com',
    apiKey: 'YOUR_API_KEY',  // TODO: Add your API key from Google Cloud Console
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scopes: 'https://www.googleapis.com/auth/drive.file'
};

// Storage key for recent paths
const RECENT_PATHS_KEY = 'recentDrivePaths';
const MAX_RECENT_PATHS = 6;

class GoogleDriveSync {
    constructor() {
        this.isSignedIn = false;
        this.tokenClient = null;
        this.gapiLoaded = false;
        this.gisLoaded = false;
    }

    /**
     * Initialize the Google API client
     * Call this when the page loads
     */
    async init() {
        return new Promise((resolve, reject) => {
            // Check if credentials are configured
            if (GOOGLE_CONFIG.clientId === 'YOUR_CLIENT_ID.apps.googleusercontent.com') {
                console.warn('[GoogleDrive] API credentials not configured. Please update google-drive.js with your credentials.');
                resolve(false);
                return;
            }

            // Load the Google API script
            const gapiScript = document.createElement('script');
            gapiScript.src = 'https://apis.google.com/js/api.js';
            gapiScript.onload = () => this.onGapiLoad().then(() => {
                this.gapiLoaded = true;
                this.checkReady(resolve);
            });
            document.head.appendChild(gapiScript);

            // Load the Google Identity Services script
            const gisScript = document.createElement('script');
            gisScript.src = 'https://accounts.google.com/gsi/client';
            gisScript.onload = () => {
                this.gisLoaded = true;
                this.initTokenClient();
                this.checkReady(resolve);
            };
            document.head.appendChild(gisScript);
        });
    }

    checkReady(resolve) {
        if (this.gapiLoaded && this.gisLoaded) {
            resolve(true);
        }
    }

    async onGapiLoad() {
        return new Promise((resolve) => {
            gapi.load('client', async () => {
                await gapi.client.init({
                    apiKey: GOOGLE_CONFIG.apiKey,
                    discoveryDocs: GOOGLE_CONFIG.discoveryDocs
                });
                resolve();
            });
        });
    }

    initTokenClient() {
        this.tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CONFIG.clientId,
            scope: GOOGLE_CONFIG.scopes,
            callback: (response) => {
                if (response.error) {
                    console.error('[GoogleDrive] Auth error:', response.error);
                    return;
                }
                this.isSignedIn = true;
                console.log('[GoogleDrive] Successfully signed in');
            }
        });
    }

    /**
     * Prompt user to sign in
     */
    async authenticate() {
        if (!this.tokenClient) {
            throw new Error('Google Drive not initialized. Call init() first.');
        }

        return new Promise((resolve, reject) => {
            this.tokenClient.callback = (response) => {
                if (response.error) {
                    reject(new Error(response.error));
                    return;
                }
                this.isSignedIn = true;
                resolve(true);
            };

            // Check if we already have a valid token
            if (gapi.client.getToken() === null) {
                // Prompt user to sign in
                this.tokenClient.requestAccessToken({ prompt: 'consent' });
            } else {
                // Skip sign-in if already authenticated
                resolve(true);
            }
        });
    }

    /**
     * Sign out
     */
    signOut() {
        const token = gapi.client.getToken();
        if (token) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken(null);
        }
        this.isSignedIn = false;
    }

    /**
     * Save data to Google Drive at specified path
     * @param {string} path - Drive path like "/ReturnToGrace/Campaign1/cards.json"
     * @param {object} data - Data to save as JSON
     */
    async saveToPath(path, data) {
        if (!this.isSignedIn) {
            await this.authenticate();
        }

        const pathParts = path.split('/').filter(p => p);
        const fileName = pathParts.pop();
        const folderPath = pathParts;

        // Navigate/create folder structure
        let parentId = 'root';
        for (const folderName of folderPath) {
            parentId = await this.findOrCreateFolder(folderName, parentId);
        }

        // Check if file exists
        const existingFile = await this.findFile(fileName, parentId);

        const fileContent = JSON.stringify(data, null, 2);
        const blob = new Blob([fileContent], { type: 'application/json' });

        if (existingFile) {
            // Update existing file
            await this.updateFile(existingFile.id, blob);
            console.log(`[GoogleDrive] Updated: ${path}`);
        } else {
            // Create new file
            await this.createFile(fileName, blob, parentId);
            console.log(`[GoogleDrive] Created: ${path}`);
        }

        // Add to recent paths
        this.addRecentPath(path);

        return true;
    }

    /**
     * Load data from Google Drive path
     * @param {string} path - Drive path like "/ReturnToGrace/Campaign1/cards.json"
     */
    async loadFromPath(path) {
        if (!this.isSignedIn) {
            await this.authenticate();
        }

        const pathParts = path.split('/').filter(p => p);
        const fileName = pathParts.pop();
        const folderPath = pathParts;

        // Navigate folder structure
        let parentId = 'root';
        for (const folderName of folderPath) {
            const folder = await this.findFolder(folderName, parentId);
            if (!folder) {
                throw new Error(`Folder not found: ${folderName}`);
            }
            parentId = folder.id;
        }

        // Find file
        const file = await this.findFile(fileName, parentId);
        if (!file) {
            throw new Error(`File not found: ${path}`);
        }

        // Download content
        const response = await gapi.client.drive.files.get({
            fileId: file.id,
            alt: 'media'
        });

        // Add to recent paths
        this.addRecentPath(path);

        return JSON.parse(response.body);
    }

    async findFolder(name, parentId) {
        const response = await gapi.client.drive.files.list({
            q: `name='${name}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents and trashed=false`,
            fields: 'files(id, name)'
        });
        return response.result.files[0] || null;
    }

    async findOrCreateFolder(name, parentId) {
        const existing = await this.findFolder(name, parentId);
        if (existing) return existing.id;

        const response = await gapi.client.drive.files.create({
            resource: {
                name: name,
                mimeType: 'application/vnd.google-apps.folder',
                parents: [parentId]
            },
            fields: 'id'
        });
        return response.result.id;
    }

    async findFile(name, parentId) {
        const response = await gapi.client.drive.files.list({
            q: `name='${name}' and '${parentId}' in parents and trashed=false`,
            fields: 'files(id, name)'
        });
        return response.result.files[0] || null;
    }

    async createFile(name, blob, parentId) {
        const metadata = {
            name: name,
            parents: [parentId]
        };

        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', blob);

        const token = gapi.client.getToken().access_token;
        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: form
        });

        return response.json();
    }

    async updateFile(fileId, blob) {
        const token = gapi.client.getToken().access_token;
        const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: blob
        });

        return response.json();
    }

    /**
     * Get list of recently used Drive paths
     */
    getRecentPaths() {
        try {
            const stored = localStorage.getItem(RECENT_PATHS_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('[GoogleDrive] Error reading recent paths:', e);
            return [];
        }
    }

    /**
     * Add a path to the recent paths list
     */
    addRecentPath(path) {
        let paths = this.getRecentPaths();

        // Remove if already exists (to move to top)
        paths = paths.filter(p => p !== path);

        // Add to beginning
        paths.unshift(path);

        // Limit to max entries
        paths = paths.slice(0, MAX_RECENT_PATHS);

        try {
            localStorage.setItem(RECENT_PATHS_KEY, JSON.stringify(paths));
        } catch (e) {
            console.error('[GoogleDrive] Error saving recent paths:', e);
        }
    }

    /**
     * Clear all recent paths
     */
    clearRecentPaths() {
        localStorage.removeItem(RECENT_PATHS_KEY);
    }

    /**
     * Check if API is configured
     */
    isConfigured() {
        return GOOGLE_CONFIG.clientId !== 'YOUR_CLIENT_ID.apps.googleusercontent.com';
    }
}

// Create singleton instance
const googleDrive = new GoogleDriveSync();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GoogleDriveSync, googleDrive };
}

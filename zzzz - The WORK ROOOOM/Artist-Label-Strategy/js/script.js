/**
 * ARTIST LAUNCH - MASTER FILL FORM
 * Interactive form with live data binding and platform preview
 */

const ArtistLaunchApp = {
  state: {
    name: '',
    handle: '',
    photoFile: null,
    photoDataURL: null,
    filledFields: 0,
    totalFields: 40
  },

  // Initialize application
  init() {
    this.initHoverZones();
    this.updateFieldCounter();
    console.log('Artist Launch App initialized');
  },

  // === HOVER PANEL SYSTEM ===
  initHoverZones() {
    const leftZone = document.querySelector('.hover-zone-left');
    const rightZone = document.querySelector('.hover-zone-right');
    const leftPanel = document.querySelector('.panel-left');
    const rightPanel = document.querySelector('.panel-right');

    // Left hover zone
    leftZone.addEventListener('mouseenter', () => {
      leftPanel.classList.add('active');
    });

    leftPanel.addEventListener('mouseleave', () => {
      leftPanel.classList.remove('active');
    });

    // Right hover zone
    rightZone.addEventListener('mouseenter', () => {
      rightPanel.classList.add('active');
    });

    rightPanel.addEventListener('mouseleave', () => {
      rightPanel.classList.remove('active');
    });
  },

  // === DATA BINDING - NAME ===
  updateName(value) {
    this.state.name = value;

    // Update all name fields
    document.getElementById('ig-displayname').textContent = value || '-';
    document.getElementById('spotify-name').textContent = value || '-';
    document.getElementById('distrokid-name').textContent = value || '-';
    document.getElementById('distrokid-release-artist').textContent = value || '-';

    // Activate indicators
    const nameIndicators = ['nameInd1', 'nameInd2', 'nameInd3', 'nameInd4', 'nameInd5', 'nameInd6', 'nameInd7', 'nameInd8'];
    nameIndicators.forEach(id => {
      const indicator = document.getElementById(id);
      if (value) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });

    this.updateFieldCounter();
  },

  // === DATA BINDING - HANDLE ===
  updateHandle(value) {
    this.state.handle = value;

    // Update all handle fields
    document.getElementById('ig-username').textContent = value || '-';
    document.getElementById('ig-link').textContent = value ? `linktr.ee/${value.replace('@', '')}` : '-';
    document.getElementById('spotify-social').textContent = value ? `IG: ${value}` : '-';
    document.getElementById('distrokid-social').textContent = value ? `IG: ${value}` : '-';

    // Activate indicators
    const handleIndicators = ['handleInd1', 'handleInd2', 'handleInd3', 'handleInd4', 'handleInd5', 'handleInd6'];
    handleIndicators.forEach(id => {
      const indicator = document.getElementById(id);
      if (value) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });

    this.updateFieldCounter();
  },

  // === DATA BINDING - PHOTO ===
  uploadPhoto(file) {
    if (!file) return;

    this.state.photoFile = file;

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      this.state.photoDataURL = e.target.result;

      // Update photo upload button
      const photoBtn = document.getElementById('photoUploadBtn');
      photoBtn.textContent = file.name;

      // Display photo in all 3 splitter boxes
      for (let i = 1; i <= 3; i++) {
        const img = document.getElementById(`splitterImg${i}`);
        img.src = e.target.result;
        img.style.display = 'block';
      }

      // Update platform fields
      const photoFilename1 = `${this.state.name.toLowerCase().replace(/\s+/g, '')}_1080.jpg`;
      const photoFilename2 = `${this.state.name.toLowerCase().replace(/\s+/g, '')}_1500x500.jpg`;
      const photoFilename3 = `${this.state.name.toLowerCase().replace(/\s+/g, '')}_3000x3000.jpg`;

      document.getElementById('ig-photo').textContent = photoFilename1 || 'nahvi1_1080.jpg';
      document.getElementById('ig-banner').textContent = photoFilename2 || 'nahvi2_1500x500.jpg';
      document.getElementById('spotify-image').textContent = photoFilename3 || 'nahvi3_3000x3000.jpg';
      document.getElementById('spotify-pick').textContent = photoFilename3 || 'nahvi3_3000x3000.jpg';
      document.getElementById('distrokid-image').textContent = photoFilename3 || 'nahvi3_3000x3000.jpg';

      // Activate indicators
      const photoIndicators = ['photoInd1', 'photoInd2', 'photoInd3', 'photoInd4', 'photoInd5', 'photoInd6', 'photoInd7'];
      photoIndicators.forEach(id => {
        const indicator = document.getElementById(id);
        indicator.classList.add('active');
      });

      this.updateFieldCounter();
    };
    reader.readAsDataURL(file);
  },

  // === POPULATE ALL PLATFORMS ===
  populateAllPlatforms() {
    // This function is called by the GO button
    // Currently, all updates happen in real-time via updateName, updateHandle, uploadPhoto
    // The GO button serves as a visual confirmation

    if (!this.state.name && !this.state.handle && !this.state.photoFile) {
      alert('Please fill in at least one field before populating platforms!');
      return;
    }

    // Trigger animations on platform sections
    const platformSections = document.querySelectorAll('.platform-section');
    platformSections.forEach((section, index) => {
      section.style.animation = 'none';
      setTimeout(() => {
        section.style.animation = '';
      }, 10);
    });

    console.log('All platforms populated!');
  },

  // === FIELD COUNTER ===
  updateFieldCounter() {
    let filled = 0;

    // Count filled fields (8 name + 6 handle + 7 photo = 21 from master inputs)
    if (this.state.name) filled += 8;
    if (this.state.handle) filled += 6;
    if (this.state.photoFile) filled += 7;

    this.state.filledFields = filled;

    // Update UI
    const statusText = document.getElementById('statusText');
    const progressBar = document.getElementById('statusProgressBar');

    statusText.textContent = `MASTER STATUS: ${filled}/40 FIELDS FILLED ${filled >= 21 ? '✅' : ''}`;

    const percentage = (filled / this.state.totalFields) * 100;
    progressBar.style.width = `${percentage}%`;
  },

  // === LOCALSTORAGE - SAVE ===
  saveProgress() {
    const data = {
      name: this.state.name,
      handle: this.state.handle,
      photoDataURL: this.state.photoDataURL,
      timestamp: Date.now()
    };

    localStorage.setItem('artistLaunchForm', JSON.stringify(data));

    alert('✅ Progress saved successfully!');
    console.log('Form saved to localStorage:', data);
  },

  // === LOCALSTORAGE - LOAD ===
  loadProgress() {
    const saved = localStorage.getItem('artistLaunchForm');

    if (!saved) {
      alert('⚠️ No saved progress found.');
      return;
    }

    const data = JSON.parse(saved);

    // Restore name
    if (data.name) {
      document.getElementById('nameInput').value = data.name;
      this.updateName(data.name);
    }

    // Restore handle
    if (data.handle) {
      document.getElementById('handleInput').value = data.handle;
      this.updateHandle(data.handle);
    }

    // Restore photo
    if (data.photoDataURL) {
      this.state.photoDataURL = data.photoDataURL;

      const photoBtn = document.getElementById('photoUploadBtn');
      photoBtn.textContent = 'Photo loaded from save';

      // Display photo in splitter boxes
      for (let i = 1; i <= 3; i++) {
        const img = document.getElementById(`splitterImg${i}`);
        img.src = data.photoDataURL;
        img.style.display = 'block';
      }

      // Activate photo indicators
      const photoIndicators = ['photoInd1', 'photoInd2', 'photoInd3', 'photoInd4', 'photoInd5', 'photoInd6', 'photoInd7'];
      photoIndicators.forEach(id => {
        document.getElementById(id).classList.add('active');
      });

      this.state.photoFile = { name: 'loaded_from_storage.jpg' }; // Mock file object
    }

    this.updateFieldCounter();

    const date = new Date(data.timestamp);
    alert(`✅ Progress loaded successfully!\n\nSaved on: ${date.toLocaleString()}`);
    console.log('Form loaded from localStorage:', data);
  },

  // === RESET FORM ===
  resetForm() {
    if (!confirm('⚠️ Are you sure you want to reset the form? All unsaved data will be lost.')) {
      return;
    }

    // Clear state
    this.state.name = '';
    this.state.handle = '';
    this.state.photoFile = null;
    this.state.photoDataURL = null;
    this.state.filledFields = 0;

    // Clear inputs
    document.getElementById('nameInput').value = '';
    document.getElementById('handleInput').value = '';
    document.getElementById('photoInput').value = '';
    document.getElementById('photoUploadBtn').textContent = 'Click to upload photo...';

    // Clear all field values
    document.getElementById('ig-username').textContent = '-';
    document.getElementById('ig-displayname').textContent = '-';
    document.getElementById('ig-photo').textContent = '-';
    document.getElementById('ig-link').textContent = '-';
    document.getElementById('ig-banner').textContent = '-';
    document.getElementById('spotify-name').textContent = '-';
    document.getElementById('spotify-image').textContent = '-';
    document.getElementById('spotify-pick').textContent = '-';
    document.getElementById('spotify-social').textContent = '-';
    document.getElementById('distrokid-name').textContent = '-';
    document.getElementById('distrokid-image').textContent = '-';
    document.getElementById('distrokid-release-artist').textContent = '-';
    document.getElementById('distrokid-social').textContent = '-';

    // Clear splitter images
    for (let i = 1; i <= 3; i++) {
      const img = document.getElementById(`splitterImg${i}`);
      img.style.display = 'none';
      img.src = '';
    }

    // Deactivate all indicators
    const allIndicators = [
      'nameInd1', 'nameInd2', 'nameInd3', 'nameInd4', 'nameInd5', 'nameInd6', 'nameInd7', 'nameInd8',
      'handleInd1', 'handleInd2', 'handleInd3', 'handleInd4', 'handleInd5', 'handleInd6',
      'photoInd1', 'photoInd2', 'photoInd3', 'photoInd4', 'photoInd5', 'photoInd6', 'photoInd7'
    ];
    allIndicators.forEach(id => {
      document.getElementById(id).classList.remove('active');
    });

    this.updateFieldCounter();

    console.log('Form reset complete');
  },

  // === NEW ARTIST LAUNCH ===
  newArtistLaunch() {
    this.resetForm();
    alert('🚀 Ready for new artist launch!');
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  ArtistLaunchApp.init();
});

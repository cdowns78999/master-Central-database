const data = {
    midLabels: [
        { name: "XV Records", followers: "10k" },
        { name: "Lizzy", followers: "15k" },
        { name: "deadAir", followers: "20k" },
        { name: "Drink Sum Wtr", followers: "30k" },
        { name: "Fat Possum", followers: "60k" },
        { name: "Victor Victor", followers: "80k" },
        { name: "UnitedMasters", followers: "300k" }
    ],
    bigLabels: [
        { name: "Cash Money Records", followers: "840k" },
        { name: "Young Money Entertainment", followers: "2M" },
        { name: "Top Dawg Entertainment", followers: "710k" },
        { name: "Quality Control Music (QC)", followers: "1M" },
        { name: "CMG / Collective Music Group", followers: "500k" },
        { name: "OVO Sound", followers: "1.5M" },
        { name: "Dreamville Records", followers: "4M" },
        { name: "Mass Appeal", followers: "500k" },
        { name: "Death Row Records", followers: "1M" },
        { name: "Rhymesayers Entertainment", followers: "250k" },
        { name: "Mello Music Group", followers: "100k" },
        { name: "Empire", followers: "1M" },
        { name: "Internet Money", followers: "1M" }
    ],
    artists: [
        { name: "Anycia", url: "https://open.spotify.com/artist/4bOqkIGQCcuZgjfDxNuX1I", listeners: "2.3M" },
        { name: "KARRAHBOOO", url: "https://open.spotify.com/artist/3vXXs7JjWfPO0YHhDnj4SP", listeners: "421k" },
        { name: "That Mexican OT", url: "https://open.spotify.com/artist/3BAgmPNIK5IJl7zMK1wvMA", listeners: "4.7M" },
        { name: "BigXthaPlug", url: "https://open.spotify.com/artist/6qxpnaukVayrQn6ViNvu9I", listeners: "3.9M" },
        { name: "Veeze", url: "https://open.spotify.com/artist/4xFtMb0Ao3ND8HwtIbRBxa", listeners: "1.5M" },
        { name: "Skilla Baby", url: "https://open.spotify.com/artist/1GVenmuuAtusi17LY6FvgI", listeners: "2.1M" },
        { name: "Hunxho", url: "https://open.spotify.com/artist/2sCNyMIwPphH2OzRpKQPOo", listeners: "1.6M" },
        { name: "Joony", url: "https://open.spotify.com/artist/7BbfSHGgd7N6eSR6U5YHs3", listeners: "900k" },
        { name: "Ice Spice", url: "https://open.spotify.com/artist/3LZZPxNDGDFVSIPqf4JuEf", listeners: "27M" },
        { name: "Sexyy Red", url: "https://open.spotify.com/artist/4tYSBptyGeVyZsk8JC4JHZ", listeners: "12M" },
        { name: "310babii", url: "https://open.spotify.com/artist/5H9uS3c7AiA8iKJpvidJqK", listeners: "1.8M" },
        { name: "FendiDa Rappa", url: "https://open.spotify.com/artist/2FZMt7LzjtxlDKz0fS5v8F", listeners: "900k" },
        { name: "Cris Streetz", url: "https://open.spotify.com/artist/4fMhfvTQAvS3VJBL8iE3jg", listeners: "150k" },
        { name: "Bossman DLo", url: "https://open.spotify.com/artist/3VRfFcUb0c8QpU8Asp5ELK", listeners: "250k" },
        { name: "Doechii", url: "https://open.spotify.com/artist/2kRfqPViCqYdSGhYSM9R0Q", listeners: "5M" },
        { name: "Draft Day", url: "https://open.spotify.com/artist/5F9itvvEqqWDRUKsLpSO9x", listeners: "300k" },
        { name: "Homixide Gang", url: "https://open.spotify.com/artist/7s7DJcOmhTq2MjbG0TmZ4b", listeners: "1.1M" },
        { name: "BXKS", url: "https://open.spotify.com/artist/2YxM493mGjkBhqwETCW0Zx", listeners: "120k" },
        { name: "Jay Malakhi", url: "https://open.spotify.com/artist/1FH9VwBEm90LkAMPxQ24q8", listeners: "80k" },
        { name: "KarimThaPeasant", url: "https://open.spotify.com/artist/5u1CgC2UCJYlJg9kI8tK1u", listeners: "60k" }
    ]
};

function createCard(item, type) {
    const card = document.createElement('div');
    card.className = 'data-card';

    // Staggered animation delay
    const delay = Math.random() * 0.5;
    card.style.animationDelay = `${delay}s`;

    let metaLabel = type === 'artist' ? 'Monthly Listeners' : 'IG Followers';
    let metaValue = type === 'artist' ? item.listeners : item.followers;

    card.innerHTML = `
        <div class="card-info">
            <div class="card-title">${item.name}</div>
            <div class="card-meta">${metaValue} ${metaLabel}</div>
        </div>
        ${type === 'artist' ? `
            <a href="${item.url}" target="_blank" class="spotify-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.508 17.302c-.216.354-.676.467-1.03.249-2.846-1.74-6.427-2.13-10.647-1.166-.403.092-.81-.158-.902-.562-.092-.404.158-.81.562-.902 4.623-1.057 8.586-.615 11.768 1.332.354.217.466.677.249 1.03zm1.472-3.26c-.272.44-.848.584-1.288.312-3.257-2.003-8.226-2.585-12.078-1.415-.494.15-.1.87-.205.81-.494-.15-.81-.106.66-.205 1.288-.312 4.298-1.42 1.33 3.55 1.42.31 1.288zM19.11 11.12c-3.906-2.32-10.334-2.536-14.102-1.39-.6.182-1.23-.162-1.41-.762-.18-.6.162-1.23.762-1.41 4.314-1.31 11.41-1.06 15.908 1.61.54.322.716 1.02.394 1.56-.32.54-1.02.716-1.56.394z"/>
                </svg>
            </a>
        ` : ''}
    `;

    return card;
}

function init() {
    const midContainer = document.getElementById('mid-list');
    const artistContainer = document.getElementById('artist-list');
    const bigContainer = document.getElementById('big-list');

    data.bigLabels.forEach(item => bigContainer.appendChild(createCard(item, 'big')));
}

function exportData() {
    const fileName = `nahvi-pathfinder-${new Date().toISOString().slice(0, 10)}.json`;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function importData(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedData = JSON.parse(e.target.result);

            // Basic validation
            if (!importedData.midLabels || !importedData.bigLabels || !importedData.artists) {
                throw new Error("Invalid Pathfinder data format");
            }

            // Update main data
            data.midLabels = importedData.midLabels;
            data.bigLabels = importedData.bigLabels;
            data.artists = importedData.artists;

            // Clear and re-render
            document.getElementById('mid-list').innerHTML = '';
            document.getElementById('artist-list').innerHTML = '';
            document.getElementById('big-list').innerHTML = '';
            init();

            console.log("Data imported successfully");
        } catch (err) {
            console.error("Import failed:", err);
            alert("Failed to import JSON: " + err.message);
        }
    };
    reader.readAsText(file);
    // Reset input so the same file can be picked again
    input.value = '';
}

document.addEventListener('DOMContentLoaded', init);

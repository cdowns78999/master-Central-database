document.getElementById('record-btn').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://cap.so/dashboard/caps' });
});

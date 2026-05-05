document.addEventListener('DOMContentLoaded', () => {
    const slotsGrid = document.getElementById('slotsGrid');
    const slotSelect = document.getElementById('slotSelect');

    let slots = [
        { time: "8:00 AM", open: true },
        { time: "8:30 AM", open: true },
        { time: "9:00 AM", open: true },
        { time: "9:30 AM", open: true },
        { time: "10:00 AM", open: true },
        { time: "10:30 AM", open: true },
        { time: "11:00 AM", open: true },
        { time: "11:30 AM", open: true }
    ];

    // Persistence
    chrome.storage.local.get(['eliteSlots'], (res) => {
        if (res.eliteSlots) slots = res.eliteSlots;
        render();
    });

    const render = () => {
        slotsGrid.innerHTML = '';
        const selectedIdx = slotSelect.value;

        slots.forEach((s, i) => {
            const item = document.createElement('div');
            item.className = `slot-item ${selectedIdx == i ? 'active' : ''}`;
            item.innerHTML = `
        <div class="dot ${s.open ? 'dot-open' : 'dot-closed'}"></div>
        <div class="time-label">${s.time}</div>
        <div class="status-label">${s.open ? 'Open' : 'Closed'}</div>
      `;
            slotsGrid.appendChild(item);
        });
    };

    // Status Toggles
    document.getElementById('setOpen').onclick = () => {
        slots[slotSelect.value].open = true;
        save();
    };

    document.getElementById('setClose').onclick = () => {
        slots[slotSelect.value].open = false;
        save();
    };

    slotSelect.onchange = render;

    const save = () => {
        chrome.storage.local.set({ eliteSlots: slots });
        render();
    };

    // Copy Master List
    document.getElementById('copyBtn').onclick = () => {
        let t = "📅 STATUS: CALL AVAILABILITY\n\n";
        slots.forEach(s => {
            t += `${s.open ? '✅' : '❌'} ${s.time} - ${s.open ? 'OPEN' : 'CLOSED'}\n`;
        });

        navigator.clipboard.writeText(t).then(() => {
            const btn = document.getElementById('copyBtn');
            btn.innerText = 'COPIED TO CLIPBOARD';
            btn.style.background = '#1db954';
            setTimeout(() => {
                btn.innerText = 'COPY MASTER LIST';
                btn.style.background = '#fff';
            }, 2000);
        });
    };
});

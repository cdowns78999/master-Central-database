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

    chrome.storage.local.get(['fixedSlots'], (res) => {
        if (res.fixedSlots) slots = res.fixedSlots;
        render();
    });

    const render = () => {
        slotsGrid.innerHTML = '';
        const sel = slotSelect.value;
        slots.forEach((s, i) => {
            const item = document.createElement('div');
            item.className = `slot-item ${sel == i ? 'active' : ''}`;
            item.innerHTML = `
        <div class="dot ${s.open ? 'dot-open' : 'dot-closed'}"></div>
        <div class="time-txt">${s.time}</div>
      `;
            slotsGrid.appendChild(item);
        });
    };

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
        chrome.storage.local.set({ fixedSlots: slots });
        render();
    };

    document.getElementById('copyBtn').onclick = () => {
        let t = "📅 CALL AVAILABILITY\n\n";
        slots.forEach(s => {
            t += `${s.open ? '✅' : '❌'} ${s.time} - ${s.open ? 'OPEN' : 'CLOSED'}\n`;
        });
        navigator.clipboard.writeText(t).then(() => {
            const btn = document.getElementById('copyBtn');
            btn.innerText = 'COPIED!';
            setTimeout(() => { btn.innerText = 'COPY MASTER LIST'; }, 1000);
        });
    };
});

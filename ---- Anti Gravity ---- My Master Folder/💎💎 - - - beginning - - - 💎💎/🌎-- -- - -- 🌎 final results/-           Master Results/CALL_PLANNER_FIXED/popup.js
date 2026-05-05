document.addEventListener('DOMContentLoaded', () => {
    const slotsGrid = document.getElementById('slotsGrid');
    const tabsRow = document.getElementById('tabsRow');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const modeSwitcher = document.getElementById('modeSwitcher');
    const modeBtns = document.querySelectorAll('.mode-btn');

    const defaultDaySlots = [
        { time: "8:00 AM", open: true },
        { time: "8:30 AM", open: true },
        { time: "9:00 AM", open: true },
        { time: "9:30 AM", open: true },
        { time: "10:00 AM", open: true },
        { time: "10:30 AM", open: true },
        { time: "11:00 AM", open: true },
        { time: "11:30 AM", open: true }
    ];

    const defaultNightSlots = [
        { time: "7:00 PM", open: true },
        { time: "7:30 PM", open: true },
        { time: "8:00 PM", open: true },
        { time: "8:30 PM", open: true },
        { time: "9:00 PM", open: true },
        { time: "9:30 PM", open: true },
        { time: "10:00 PM", open: true },
        { time: "10:30 PM", open: true },
        { time: "11:00 PM", open: true }
    ];

    const createDayObj = () => ({
        day: JSON.parse(JSON.stringify(defaultDaySlots)),
        night: JSON.parse(JSON.stringify(defaultNightSlots))
    });

    let multiDaySlots = {
        "Monday": createDayObj(),
        "Tuesday": createDayObj(),
        "Wednesday": createDayObj(),
        "Thursday": createDayObj(),
        "Friday": createDayObj()
    };

    let selectedDay = "Monday";
    let currentMode = "day";

    chrome.storage.local.get(['multiDaySlots', 'selectedDay', 'currentMode'], (res) => {
        if (res.multiDaySlots) {
            const firstDayValue = Object.values(res.multiDaySlots)[0];
            if (Array.isArray(firstDayValue)) {
                Object.keys(res.multiDaySlots).forEach(day => {
                    multiDaySlots[day].day = res.multiDaySlots[day];
                });
            } else {
                multiDaySlots = res.multiDaySlots;
                // Check if existing night slots need the 11pm addition
                Object.keys(multiDaySlots).forEach(day => {
                    if (multiDaySlots[day].night.length < defaultNightSlots.length) {
                        const newSlot = JSON.parse(JSON.stringify(defaultNightSlots[defaultNightSlots.length - 1]));
                        multiDaySlots[day].night.push(newSlot);
                    }
                });
            }
        }

        if (res.selectedDay) selectedDay = res.selectedDay;
        if (res.currentMode) currentMode = res.currentMode;

        updateActiveTab();
        updateActiveMode();
        render();
    });

    const updateActiveTab = () => {
        tabBtns.forEach(btn => {
            if (btn.getAttribute('data-day') === selectedDay) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    const updateActiveMode = () => {
        modeBtns.forEach(btn => {
            if (btn.getAttribute('data-mode') === currentMode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    const render = () => {
        slotsGrid.innerHTML = '';
        const currentSlots = multiDaySlots[selectedDay][currentMode];

        currentSlots.forEach((s, i) => {
            const item = document.createElement('div');
            item.className = 'slot-item';
            item.innerHTML = `
                <div class="dot ${s.open ? 'dot-open' : 'dot-closed'}"></div>
                <div class="time-txt">${s.time}</div>
            `;
            item.onclick = () => {
                s.open = !s.open;
                save();
            };
            slotsGrid.appendChild(item);
        });
    };

    tabBtns.forEach(btn => {
        btn.onclick = () => {
            selectedDay = btn.getAttribute('data-day');
            chrome.storage.local.set({ selectedDay: selectedDay });
            updateActiveTab();
            render();
        };
    });

    modeBtns.forEach(btn => {
        btn.onclick = () => {
            currentMode = btn.getAttribute('data-mode');
            chrome.storage.local.set({ currentMode: currentMode });
            updateActiveMode();
            render();
        };
    });

    const save = () => {
        chrome.storage.local.set({ multiDaySlots: multiDaySlots });
        render();
    };

    const formatSlotList = (day, mode) => {
        const slots = multiDaySlots[day][mode];
        // Removing modeLabel for cleaner template match
        let t = `${day}\n\n📅 CALL AVAILABILITY\n\n`;
        slots.forEach(s => {
            t += `${s.open ? '✅' : '❌'} ${s.time} - ${s.open ? 'OPEN' : 'CLOSED'}\n`;
        });
        return t;
    };

    document.getElementById('copyBtn').onclick = () => {
        const t = formatSlotList(selectedDay, currentMode);
        navigator.clipboard.writeText(t).then(() => {
            const btn = document.getElementById('copyBtn');
            btn.innerText = 'COPIED!';
            setTimeout(() => { btn.innerText = 'COPY MASTER LIST (CURRENT)'; }, 1000);
        });
    };

    const copyWeek = (mode, btnId) => {
        // Build with exact template separators
        let fullList = "==== ==== ==== ====\n\n";
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

        days.forEach((day, idx) => {
            fullList += formatSlotList(day, mode);
            fullList += "\n==== ==== ==== ====\n\n";
            if (idx < days.length - 1) {
                fullList += "==== ==== ==== ====\n\n";
            }
        });

        const btn = document.getElementById(btnId);
        const originalText = btn.innerText;
        navigator.clipboard.writeText(fullList).then(() => {
            btn.innerText = 'COPIED!';
            setTimeout(() => { btn.innerText = originalText; }, 1000);
        });
    };

    document.getElementById('copyAllDayBtn').onclick = () => copyWeek('day', 'copyAllDayBtn');
    document.getElementById('copyAllNightBtn').onclick = () => copyWeek('night', 'copyAllNightBtn');
});

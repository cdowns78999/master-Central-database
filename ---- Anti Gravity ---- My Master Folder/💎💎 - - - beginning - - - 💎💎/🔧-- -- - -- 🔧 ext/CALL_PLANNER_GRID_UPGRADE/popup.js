document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const viewToggle = document.getElementById('viewToggle');
    const dayTabs = document.getElementById('dayTabs');
    const morningCards = document.getElementById('morningCards');
    const eveningCards = document.getElementById('eveningCards');
    const copyCurrentAMBtn = document.getElementById('copyCurrentAMBtn');
    const copyCurrentPMBtn = document.getElementById('copyCurrentPMBtn');
    const copyWeekAMBtn = document.getElementById('copyWeekAMBtn');
    const copyWeekPMBtn = document.getElementById('copyWeekPMBtn');
    const copyFullDayBtn = document.getElementById('copyFullDayBtn');
    const copyFinalMasterBtn = document.getElementById('copyFinalMasterBtn');

    // State
    let currentView = 'internal'; // 'internal' or 'public'
    let currentDay = 'Monday';

    const AM_TIMES = ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
    const PM_TIMES = ["7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM"];

    const CLOSED_SLOTS_DEFAULTS = {
        "Monday": { "10:30 AM": "Bobby" },
        "Wednesday": { "7:30 PM": "Nahvi" },
        "Thursday": { "10:30 AM": "Lemi Vice" },
        "Friday": { "11:00 AM": "ACCIO" }
    };

    let scheduleData = {};

    // Initialize Data
    const initData = () => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        days.forEach(day => {
            scheduleData[day] = {
                am: AM_TIMES.map(time => ({
                    time,
                    open: !(CLOSED_SLOTS_DEFAULTS[day] && CLOSED_SLOTS_DEFAULTS[day][time]),
                    name: (CLOSED_SLOTS_DEFAULTS[day] && CLOSED_SLOTS_DEFAULTS[day][time]) || ""
                })),
                pm: PM_TIMES.map(time => ({
                    time,
                    open: !(CLOSED_SLOTS_DEFAULTS[day] && CLOSED_SLOTS_DEFAULTS[day][time]),
                    name: (CLOSED_SLOTS_DEFAULTS[day] && CLOSED_SLOTS_DEFAULTS[day][time]) || ""
                }))
            };
        });
    };

    // Load from storage
    chrome.storage.local.get(['scheduleData', 'currentDay', 'currentView'], (result) => {
        if (result.scheduleData) {
            scheduleData = result.scheduleData;
            // Migration: Ensure 11:00 PM is removed and names are injected for final launch
            Object.keys(scheduleData).forEach(day => {
                if (scheduleData[day].pm) {
                    scheduleData[day].pm = scheduleData[day].pm.filter(slot => slot.time !== "11:00 PM");
                }

                // Final Launch Injections: FORCE defaults for the requested slots
                if (CLOSED_SLOTS_DEFAULTS[day]) {
                    Object.keys(CLOSED_SLOTS_DEFAULTS[day]).forEach(time => {
                        const block = time.includes('AM') ? 'am' : 'pm';
                        const slot = scheduleData[day][block].find(s => s.time === time);
                        if (slot) {
                            slot.name = CLOSED_SLOTS_DEFAULTS[day][time];
                            slot.open = false; // Force it to be closed as requested
                        }
                    });
                }
            });
        } else {
            initData();
        }
        if (result.currentDay) currentDay = result.currentDay;
        if (result.currentView) currentView = result.currentView;

        updateUI();
    });

    // Save to storage
    const saveData = () => {
        chrome.storage.local.set({ scheduleData, currentDay, currentView });
    };

    const updateUI = () => {
        // Update View Toggle Class
        viewToggle.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === currentView);
        });

        // Update Day Tabs Class
        dayTabs.querySelectorAll('.tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.day === currentDay);
        });

        renderSlots();
    };

    const renderSlots = () => {
        const dayData = scheduleData[currentDay];

        morningCards.innerHTML = '';
        eveningCards.innerHTML = '';

        const createSlotRow = (slot, type, index) => {
            const row = document.createElement('div');
            row.className = 'slot-row';

            const isClosed = !slot.open;
            const icon = isClosed ? '&#10007;' : '&#10003;';
            const statusText = isClosed ? 'Closed' : 'Open';
            const showName = currentView === 'internal' && isClosed && slot.name;

            row.innerHTML = `
                <div class="slot-icon ${isClosed ? 'closed' : 'open'}">${icon}</div>
                <span class="slot-time">${slot.time}</span>
                <span class="slot-status ${isClosed ? 'closed' : 'open'}">${statusText}</span>
                ${showName ? `<span class="slot-name">${slot.name}</span>` : ''}
            `;

            row.onclick = () => {
                slot.open = !slot.open;
                if (!slot.open && currentView === 'internal') {
                    // Simple prompt for name if it's internal view and being closed
                    const name = prompt("Enter artist name for this slot:", slot.name);
                    if (name !== null) slot.name = name;
                }
                saveData();
                renderSlots();
            };

            return row;
        };

        dayData.am.forEach((slot, i) => morningCards.appendChild(createSlotRow(slot, 'am', i)));
        dayData.pm.forEach((slot, i) => eveningCards.appendChild(createSlotRow(slot, 'pm', i)));
    };

    // Event Listeners
    viewToggle.addEventListener('click', (e) => {
        const btn = e.target.closest('.toggle-btn');
        console.log('Toggle clicked:', btn, 'data-view:', btn?.dataset.view);
        if (btn) {
            currentView = btn.dataset.view;
            console.log('Current view changed to:', currentView);
            saveData();
            updateUI();
        }
    });

    dayTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab');
        if (btn) {
            currentDay = btn.dataset.day;
            saveData();
            updateUI();
        }
    });

    // Copying Logic
    const formatSchedule = (day, type) => {
        const slots = scheduleData[day][type];
        const blockName = type === 'am' ? 'Morning Block' : 'Evening Block';
        let output = `${day} - ${blockName}\n\n📅 CALL AVAILABILITY\n\n`;

        slots.forEach(s => {
            const status = s.open ? 'OPEN' : 'CLOSED';
            const icon = s.open ? '✅' : '❌';
            output += `${icon} ${s.time} - ${status}\n`;
        });
        return output;
    };

    copyCurrentAMBtn.onclick = () => {
        const text = formatSchedule(currentDay, 'am');
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyCurrentAMBtn.innerText;
            copyCurrentAMBtn.innerText = 'COPIED!';
            setTimeout(() => copyCurrentAMBtn.innerText = originalText, 1000);
        });
    };

    copyCurrentPMBtn.onclick = () => {
        const text = formatSchedule(currentDay, 'pm');
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyCurrentPMBtn.innerText;
            copyCurrentPMBtn.innerText = 'COPIED!';
            setTimeout(() => copyCurrentPMBtn.innerText = originalText, 1000);
        });
    };

    copyFullDayBtn.onclick = () => {
        const am = formatSchedule(currentDay, 'am');
        const pm = formatSchedule(currentDay, 'pm');
        const text = am + "\n" + pm;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyFullDayBtn.innerText;
            copyFullDayBtn.innerText = 'COPIED!';
            setTimeout(() => copyFullDayBtn.innerText = originalText, 1000);
        });
    };

    copyFinalMasterBtn.onclick = () => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        let fullList = "==== OVERALL MASTER SCHEDULE ====\n\n";
        days.forEach(day => {
            fullList += formatSchedule(day, 'am') + "\n";
            fullList += formatSchedule(day, 'pm') + "\n";
            fullList += "==== ==== ==== ====\n\n";
        });

        navigator.clipboard.writeText(fullList).then(() => {
            const originalText = copyFinalMasterBtn.innerText;
            copyFinalMasterBtn.innerText = 'MASTER COPIED!';
            setTimeout(() => copyFinalMasterBtn.innerText = originalText, 1000);
        });
    };

    const copyWeek = (type, btn) => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        let fullList = "==== ==== ==== ====\n\n";
        days.forEach(day => {
            fullList += formatSchedule(day, type) + "\n==== ==== ==== ====\n\n";
        });

        navigator.clipboard.writeText(fullList).then(() => {
            const originalText = btn.innerText;
            btn.innerText = 'COPIED!';
            setTimeout(() => btn.innerText = originalText, 1000);
        });
    };

    copyWeekAMBtn.onclick = () => copyWeek('am', copyWeekAMBtn);
    copyWeekPMBtn.onclick = () => copyWeek('pm', copyWeekPMBtn);
});

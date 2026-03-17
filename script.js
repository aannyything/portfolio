// ─── LIVE CLOCK ───────────────────────────────────
function updateClock() {
    const now = new Date();
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    document.getElementById('clock').textContent = now.toLocaleString('en-US', options);
}

updateClock();
setInterval(updateClock, 10000);


// ─── DARK MODE TOGGLE ─────────────────────────────
function toggleDark() {
    const isDark = document.body.classList.toggle('dark');
    const icon = document.getElementById('toggle-icon');
    const label = document.getElementById('toggle-label');

    if (isDark) {
        icon.textContent = '○';
        label.textContent = 'light';
    } else {
        icon.textContent = '☽';
        label.textContent = 'dark';
    }

    // Remember preference
    localStorage.setItem('darkMode', isDark ? 'on' : 'off');
}

// On page load, check saved preference
if (localStorage.getItem('darkMode') === 'on') {
    document.body.classList.add('dark');
    document.getElementById('toggle-icon').textContent = '○';
    document.getElementById('toggle-label').textContent = 'light';
}
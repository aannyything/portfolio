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

// ─── WINDOW MANAGEMENT ────────────────────────────

// Track which window is on top
let zTop = 500;

// Open a window
function openWindow(name) {
    const win = document.getElementById('win-' + name);
    if (!win) return;

    win.classList.add('open');
    win.classList.add('active');

    // Bring to front
    win.style.zIndex = ++zTop;

    // Remove active from other windows
    document.querySelectorAll('.window').forEach(w => {
        if (w !== win) w.classList.remove('active');
    });
}

// Close a window
function closeWindow(name) {
    const win = document.getElementById('win-' + name);
    if (!win) return;

    win.classList.remove('open', 'active');
}

// Minimize (same as close for now)
function minimizeWindow(name) {
    closeWindow(name);
}

// Maximize / restore
function maximizeWindow(name) {
    const win = document.getElementById('win-' + name);
    if (!win) return;

    if (win.dataset.maximized === 'true') {
        // Restore saved position
        win.style.left = win.dataset.savedLeft;
        win.style.top = win.dataset.savedTop;
        win.style.width = win.dataset.savedWidth;
        win.style.height = win.dataset.savedHeight;
        win.dataset.maximized = 'false';
    } else {
        // Save current position
        win.dataset.savedLeft = win.style.left;
        win.dataset.savedTop = win.style.top;
        win.dataset.savedWidth = win.style.width;
        win.dataset.savedHeight = win.style.height;

        // Maximize
        win.style.left = '0';
        win.style.top = '28px';
        win.style.width = '100vw';
        win.style.height = 'calc(100vh - 28px - 80px)';
        win.dataset.maximized = 'true';
    }
}

// Click on desktop = deactivate all windows
document.getElementById('desktop').addEventListener('click', () => {
    document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
});

// Click inside window = bring to front
document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => {
        win.style.zIndex = ++zTop;
        document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
        win.classList.add('active');
    });
});

// Open About window on page load
setTimeout(() => openWindow('about'), 200);

// Close a window with animation
function closeWindow(name) {
    const win = document.getElementById('win-' + name);
    if (!win) return;

    // Add closing animation
    win.classList.add('closing');

    // Wait for animation to finish, then hide
    setTimeout(() => {
        win.classList.remove('open', 'active', 'closing');
    }, 150);
}
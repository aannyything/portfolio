// Updates the clock with the current time
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

// Run once immediately
updateClock();

// Then update every 10 seconds
setInterval(updateClock, 10000);
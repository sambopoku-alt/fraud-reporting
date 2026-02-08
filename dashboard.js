// dashboard.js

// Function to display the current date and time in UTC
function displayCurrentDateTime() {
    const now = new Date();
    const utcDateTime = now.toISOString().replace('T', ' ').substring(0, 19);
    console.log(`Current Date and Time (UTC): ${utcDateTime}`);
}

// Function to initialize the dashboard
function initializeDashboard() {
    console.log("Initializing dashboard...");
    displayCurrentDateTime();
}

// Call initialize function
initializeDashboard();
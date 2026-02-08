// db.js
const dbName = 'FraudReportsDB';
const storeName = 'fraudReports';

let db;

// Open the database
function openDatabase() {
    const request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
        console.error('Database error:', event.target.errorCode);
    };

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log('Database opened successfully');
    };
}

// Add a fraud report
function addFraudReport(report) {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    store.add(report);
}

// Get all fraud reports
function getFraudReports(callback) {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = function(event) {
        callback(event.target.result);
    };
}

// Open database on script load
openDatabase();

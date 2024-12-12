// JavaScript file to display alarm status from a WebSocket

// Function to initialize WebSocket and handle alarm status updates
function initializeAlarmWebSocket() {
    // Replace with your WebSocket server URL
    const socket = new WebSocket('wss://example.com/alarm');

    // Event listener for when the connection opens
    socket.addEventListener('open', () => {
        console.log('WebSocket connection for alarm established.');
    });

    // Event listener for when a message is received
    socket.addEventListener('message', (event) => {
        try {
            // Parse the incoming data
            const data = JSON.parse(event.data);

            // Assuming the data contains an alarm status
            const alarmStatus = data.status; // Example: "active", "inactive"

            updateAlarmDisplay(alarmStatus);
        } catch (error) {
            console.error('Error parsing WebSocket message for alarm:', error);
        }
    });

    // Event listener for errors
    socket.addEventListener('error', (error) => {
        console.error('WebSocket error for alarm:', error);
    });

    // Event listener for when the connection is closed
    socket.addEventListener('close', () => {
        console.log('WebSocket connection for alarm closed.');
    });
}

// Function to update the alarm status display
function updateAlarmDisplay(status) {
    const alarmDiv = document.getElementById('alarm');

    // Find or create the alarm status <p> element
    const statusElement = alarmDiv.querySelector('#alarm-status') || document.createElement('p');

    // Set its ID and content
    statusElement.id = 'alarm-status';
    statusElement.textContent = `Status: ${status}`;

    // Append it to the alarm div if not already present
    if (!alarmDiv.contains(statusElement)) alarmDiv.appendChild(statusElement);
}

// Initialize WebSocket connection for alarm
initializeAlarmWebSocket();
// JavaScript file to display battery status from a WebSocket

// Function to initialize WebSocket and handle battery status updates
function initializeBatteryWebSocket() {
    // Replace with your WebSocket server URL
    const socket = new WebSocket('wss://example.com/battery');

    // Event listener for when the connection opens
    socket.addEventListener('open', () => {
        console.log('WebSocket connection for battery established.');
    });

    // Event listener for when a message is received
    socket.addEventListener('message', (event) => {
        try {
            // Parse the incoming data
            const data = JSON.parse(event.data);

            // Assuming the data contains a battery status
            const batteryStatus = data.status; // Example: "100%", "50%", "Charging"

            updateBatteryDisplay(batteryStatus);
        } catch (error) {
            console.error('Error parsing WebSocket message for battery:', error);
        }
    });

    // Event listener for errors
    socket.addEventListener('error', (error) => {
        console.error('WebSocket error for battery:', error);
    });

    // Event listener for when the connection is closed
    socket.addEventListener('close', () => {
        console.log('WebSocket connection for battery closed.');
    });
}

// Function to update the battery status display
function updateBatteryDisplay(status) {
    const batteryDiv = document.getElementById('battery');

    // Find or create the battery status <p> element
    const statusElement = batteryDiv.querySelector('#battery-status') || document.createElement('p');

    // Set its ID and content
    statusElement.id = 'battery-status';
    statusElement.textContent = `Status: ${status}`;

    // Append it to the battery div if not already present
    if (!batteryDiv.contains(statusElement)) batteryDiv.appendChild(statusElement);
}

// Initialize WebSocket connection for battery
initializeBatteryWebSocket();
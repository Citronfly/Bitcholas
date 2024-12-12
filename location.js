// JavaScript file to display current location from a WebSocket

// Function to initialize WebSocket and handle location updates
function initializeWebSocket() {
    // Replace with your WebSocket server URL
    const socket = new WebSocket('wss://example.com/location');

    // Event listener for when the connection opens
    socket.addEventListener('open', () => {
        console.log('WebSocket connection established.');
    });

    // Event listener for when a message is received
    socket.addEventListener('message', (event) => {
        try {
            // Parse the incoming data
            const data = JSON.parse(event.data);

            // Assuming the data contains latitude and longitude
            const latitude = data.latitude;
            const longitude = data.longitude;

            updateLocationDisplay(latitude, longitude);
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    });

    // Event listener for errors
    socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
    });

    // Event listener for when the connection is closed
    socket.addEventListener('close', () => {
        console.log('WebSocket connection closed.');
    });
}

// Function to update the location display
function updateLocationDisplay(latitude, longitude) {
    const locationDiv = document.getElementById('location');

    // Find or create the latitude and longitude <p> elements
    const latElement = locationDiv.querySelector('#lat') || document.createElement('p');
    const longElement = locationDiv.querySelector('#long') || document.createElement('p');

    // Set their IDs and content
    latElement.id = 'lat';
    longElement.id = 'long';
    latElement.textContent = `Lat: ${latitude}`;
    longElement.textContent = `Long: ${longitude}`;

    // Append them to the location div if not already present
    if (!locationDiv.contains(latElement)) locationDiv.appendChild(latElement);
    if (!locationDiv.contains(longElement)) locationDiv.appendChild(longElement);
}

// Initialize WebSocket connection
initializeWebSocket();
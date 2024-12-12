// JavaScript file to display temperature readings from a WebSocket

// Function to initialize WebSocket and handle temperature updates
function initializeTemperatureWebSocket() {
    // Replace with your WebSocket server URL
    const socket = new WebSocket('wss://example.com/temperature');

    // Event listener for when the connection opens
    socket.addEventListener('open', () => {
        console.log('WebSocket connection for temperature established.');
    });

    // Event listener for when a message is received
    socket.addEventListener('message', (event) => {
        try {
            // Parse the incoming data
            const data = JSON.parse(event.data);

            // Assuming the data contains a temperature field
            const temperature = data.temperature;

            updateTemperatureDisplay(temperature);
        } catch (error) {
            console.error('Error parsing WebSocket message for temperature:', error);
        }
    });

    // Event listener for errors
    socket.addEventListener('error', (error) => {
        console.error('WebSocket error for temperature:', error);
    });

    // Event listener for when the connection is closed
    socket.addEventListener('close', () => {
        console.log('WebSocket connection for temperature closed.');
    });
}

// Function to update the temperature display
function updateTemperatureDisplay(temperature) {
    const tempDiv = document.getElementById('temp');

    // Select all temperature <p> elements
    const tempElements = tempDiv.querySelectorAll('#ptemp');

    // Shift existing temperatures downward
    for (let i = tempElements.length - 1; i > 0; i--) {
        tempElements[i].textContent = tempElements[i - 1].textContent;
    }

    // Update the topmost temperature element with the new value
    if (tempElements[0]) {
        tempElements[0].textContent = `Temp: ${temperature}°C`;
    }
}

// Initialize WebSocket connection for temperature
initializeTemperatureWebSocket();
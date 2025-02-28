const ws = new WebSocket('ws://your-websocket-server-address'); // Replace with your WebSocket server address
const messagesList = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

ws.onopen = () => {
    console.log('Connected to WebSocket server');
};

ws.onmessage = (event) => {
    const message = event.data;
    const messageItem = document.createElement('li');
    messageItem.textContent = message;
    messagesList.appendChild(messageItem);
};

ws.onclose = (event) => {
    console.log('Disconnected from WebSocket server', event);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    ws.send(message);
    messageInput.value = '';
});

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
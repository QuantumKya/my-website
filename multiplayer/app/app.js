const socket = new WebSocket('ws://localhost:3000');

function yap(event) {
    event.preventDefault();
    const input = document.querySelector('input');

    if (input.value) {
        socket.send(input.value);
        input.value = "";
    }
    input.focus();
}

document.querySelector('form').addEventListener('submit', yap);

// listen message
socket.addEventListener('message', ({ data }) => {
    const line = document.createElement('li');
    line.textContent = data;
    document.querySelector('ul').appendChild(line);
});
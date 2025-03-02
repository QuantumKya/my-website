async function getChatData() {
    let dataIn;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        dataIn = data;
    })
    .catch(error => console.error("Error: ", error));

    return dataIn;
}

document.addEventListener('DOMContentLoaded', () => {
    const chatDisplayEl = document.getElementById('chat-display');
    const messageFormEl = document.getElementById('textbox');
    const messageInputEl = document.getElementById('message-box');
    const messageSendEl = document.getElementById('send-button');

    const url = "https://qk-vercel-fastapi.vercel.app/sent/";

    while (true) {
        const currentChat = getChatData();
        chatDisplayEl.innerHTML = '';
        for (x of JSON.parse(currentChat)) {
            let newL = document.createElement('li');
            newL.innerHTML = `${x["sender"]}: ${x["message"]}`;
            chatDisplayEl.append(newL);
        }
    }
});
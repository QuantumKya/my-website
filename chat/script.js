const chatDisplayEl = document.getElementById('chat-display');
const messageFormEl = document.getElementById('textbox');
const messageInputEl = document.getElementById('message-box');
const messageSendEl = document.getElementById('send-button');

const url = "https://qk-vercel-fastapi.vercel.app/sent";

async function getChatData() {
    const datagot = await fetch(url);
    if (!datagot.ok) throw new Error(`Data did not get gotten correctly.\nResponse says: ${datagot.status}`);


    const json = await datagot.json();
    console.log(json);
    return json;
}

while (true) {
    const currentChat = getChatData();
    chatDisplayEl.innerHTML = '';
    for (x of currentChat) {
        let newL = document.createElement('li');
        newL.innerHTML = `${x["sender"]}: ${x["message"]}`;
        chatDisplayEl.append(newL);
    }
}
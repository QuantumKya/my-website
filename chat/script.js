const pullurl = "https://qk-vercel-fastapi.vercel.app/sent/";
const sendurl = "https://qk-vercel-fastapi.vercel.app/yap/";
let shouldUpdate = false;

async function getMessages() {
    try {
        const res = await fetch(pullurl);
        const data = res.json();
        return data;
    }
    catch (error) { console.log(error); }
}

async function yapMessage(message, sender) {
    await fetch(sendurl, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({"message": message, "sender": sender})
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const chatDisplayEl = document.getElementById('chat-display');
    const messageFormEl = document.getElementById('textbox');
    const messageInputEl = document.getElementById('message-box');
    const messageSendEl = document.getElementById('send-button');

    async function updateChat() {
        let currentChat = await getMessages();
        console.log(currentChat);
        
        chatDisplayEl.textContent = '';
        for (let i = 0; i < currentChat.length; i++) {
            let newL = document.createElement('li');
            newL.innerHTML = `${currentChat[i]["sender"]}: ${currentChat[i]["message"]}`;
            chatDisplayEl.append(newL);
        }
    }

    updateChat();
});
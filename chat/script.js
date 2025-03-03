async function getChatData(url) {
    let dataIn;
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

    return dataIn;
}

document.addEventListener('DOMContentLoaded', () => {
    const chatDisplayEl = document.getElementById('chat-display');
    const messageFormEl = document.getElementById('textbox');
    const messageInputEl = document.getElementById('message-box');
    const messageSendEl = document.getElementById('send-button');

    const targeturl = "https://qk-vercel-fastapi.vercel.app/sent/";

    getChatData(targeturl);

    /*
    while (true) {
        const currentChat = getChatData(targeturl);
        console.log(currentChat);
        chatDisplayEl.innerHTML = '';
        for (x of JSON.parse(currentChat)) {
            let newL = document.createElement('li');
            newL.innerHTML = `${x["sender"]}: ${x["message"]}`;
            chatDisplayEl.append(newL);
        }
    }
    */
});
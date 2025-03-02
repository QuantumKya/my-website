from fastapi import FastAPI, WebSocket
from pydantic import BaseModel
import json

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.websocket("/ws/{client_id}")
async def ws_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    print("Connection succesfill!")

@app.post("/yap")
async def submit_yap(message: str, sender: str):
    with open("trashcan.json", "r") as file:
        data = json.load(file)
        data["rice-messages"].append({"message": message, "sender": sender})
    with open("trashcan.json", "w") as file:
        json.dump(data, file)
    return {"message": "yap submitted"}

@app.get("/sent")
def get_messages():
    with open("trashcan.json", "r") as file:
        data = json.load(file)
        return data["rice-messages"]
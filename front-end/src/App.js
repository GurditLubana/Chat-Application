import React, { useEffect, useState } from "react";
import "./App.css";
import SendMsg from "./components/SendMsg";
import MessageBody from "./components/MessageBody";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";
import SocketContext from "./Context/socketContext";

function App() {
  
  const[socket, setSocket] = useState(null);
  const[newMessage, setNewMessage] = useState(null)
  const[messageList, setMsgList] = useState(["hello", "kive o", "mai theek"])

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log(`i am connected | session id: ${newSocket.id}`);
      
    });
    
    return () => {
      newSocket.disconnect();
      console.log(`Session got disconnected`);
    };
    
  }, []);

  const updateMsg = (newMessage)=>{

    setNewMessage(newMessage);
    setMsgList(list => [...list, newMessage]);

  }

  
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <MessageBody messageList={messageList}/>
        <SendMsg  setNewMessage={updateMsg}/>
      </div>
    </SocketContext.Provider>
  );
}

export default App;

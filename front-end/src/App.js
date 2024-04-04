import React, { useEffect, useState } from "react";
import "./App.css";
import SendMsg from "./components/SendMsg";
import MessageBody from "./components/MessageBody";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";
import SocketContext from "./Context/socketContext.js";
import ConnectedUsers from "./components/ConnectedUsers.jsx";
import Login from "./components/Login.jsx";

function App() {
  
  const[socket, setSocket] = useState(null);
  const[newMessage, setNewMessage] = useState(null)
  const[messageList, setMsgList] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false);


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

  const handleLogin = (username, password) => {
    // Here you would usually make a request to your backend to authenticate the user
    // For demonstration, we assume the login is successful
    setIsAuthenticated(true);
  };
  
  
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        {isAuthenticated ? (
          <>
            <ConnectedUsers/>
            <MessageBody messageList={messageList}/>
            <SendMsg setNewMessage={updateMsg}/>
          </>
        ) : (
          <Login onLogin={handleLogin} setIsAuthenticated={setIsAuthenticated}/>
        )}
      </div>
    </SocketContext.Provider>
  );
  
}

export default App;

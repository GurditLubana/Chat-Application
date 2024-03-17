import React, { useEffect, useState } from "react";
import "./App.css";
import SendMsg from "./components/SendMsg";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";
import SocketContext from "./socketContext";

function App() {
  
  const[socket, setSocket] = useState(null);

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
  
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <SendMsg  />
      </div>
    </SocketContext.Provider>
  );
}

export default App;

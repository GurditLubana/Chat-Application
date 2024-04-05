import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";
import SocketContext from "./Context/socketContext.js";
import Login from "./components/Login.jsx";
import ChatApp from "./components/ChatApp.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  const [socket, setSocket] = useState(null);
  
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

  const handleLogin = (username, password) => {
    // Here you would usually make a request to your backend to authenticate the user
    // For demonstration, we assume the login is successful
  };

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              onLogin={handleLogin}
              
            />
          }
        />
        <Route path="/chat" element={<ChatApp />} />
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;

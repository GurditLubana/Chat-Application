import { React, useContext, useEffect, useState } from "react";
import "./ConnectedUsers.css";
import {
  CDBSidebar,
  CDBSidebarFooter,
  CDBSidebarHeader,
} from "cdbreact";
import SocketContext from "../Context/socketContext.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export default function ConnectedUsers() {

const navigate= useNavigate();
const socket = useContext(SocketContext);
const [onlineUserList, setOnlineUserList] = useState([]);
const [isSidebarToggled, setIsSidebarToggled] = useState(true); 


useEffect(() => {
  console.log(isSidebarToggled)
  const msgBody = document.getElementById("msgBody");
  if(!isSidebarToggled){ 
    msgBody.classList.remove("sidebarToggled")
    msgBody.classList.add("sidebarNotToggled");
}

  else{  
    msgBody.classList.remove("sidebarNotToggled")
    msgBody.classList.add("sidebarToggled");
}
}, [isSidebarToggled]);


useEffect(() => {
    if (socket) {
      
      socket.on("ConnectedUsers",(list)=>{
        console.log("this is the list:",list)
        setOnlineUserList(list)
      });
      return () => {
        
        socket.off("ConnectedUsers");
      };
    }
  }, [socket]);

  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  const handleLogout = ()=>{
    Cookies.remove('access_token');
    socket.emit("logout", socket.id );
    navigate("/");
  }
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar   id="sidebar" toggled={isSidebarToggled}
        textColor="#fff"
        backgroundColor="#00a884"
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={toggleSidebar}></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Online Users
          </a>
        </CDBSidebarHeader>
    {onlineUserList.map((user )=>{
        return <p> {user}</p>
    })}
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px",
            }}
          >

            <button onClick={handleLogout} className="btn btn-info mx-2">Logout</button>
            
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

import { React, useContext, useEffect, useRef, useState } from "react";
import "./ConnectedUsers.css";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import SocketContext from "../Context/socketContext.js";

export default function ConnectedUsers() {
const socket = useContext(SocketContext);
const [onlineUserList, setOnlineUserList] = useState([]);
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
  return (
    <div
      style={{ display: "flex", height: "92vh", overflow: "scroll initial" }}
    >
      <CDBSidebar toggled={true} textColor="#fff" backgroundColor="#00a884">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
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
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

import { React, useContext, useEffect, useState } from "react";
import "./ConnectedUsers.css";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import SocketContext from "../Context/socketContext.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ConnectedUsers(props) {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [onlineUserList, setOnlineUserList] = useState([]);
  const [isSidebarToggled, setIsSidebarToggled] = useState(true);

  useEffect(() => {
    // console.log("this page belongs to ", props.userDetails.name);
    const msgBody = document.getElementById("msgBody");
    if (!isSidebarToggled) {
      msgBody.classList.remove("sidebarToggled");
      msgBody.classList.add("sidebarNotToggled");
    } else {
      msgBody.classList.remove("sidebarNotToggled");
      msgBody.classList.add("sidebarToggled");
    }
  }, [isSidebarToggled]);

  useEffect(() => {
    if (socket) {
      socket.on("ConnectedUsers", (list) => {
        console.log("this is the list:", list);
        setOnlineUserList(list);
      });
      return () => {
        socket.off("ConnectedUsers");
      };
    }
  }, [socket]);

  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    socket.emit("logout", props.userDetails);
    navigate("/");
  };
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar
        id="sidebar"
        toggled={isSidebarToggled}
        textColor="#fff"
        backgroundColor="#00a884"
      >
        <CDBSidebarHeader
          prefix={
            <i className="fa fa-bars fa-large" onClick={toggleSidebar}></i>
          }
        >
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Users
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent>
          <CDBSidebarMenu>
        
        {onlineUserList.map((user,index) => {
          
          return <CDBSidebarMenuItem key={index} className="profileTab mb-4" ><img className="profilePic" src= {`${user.picture}`} alt={`${user.picture}`} ></img><p className="userName">{user.name}</p></CDBSidebarMenuItem>;          ;
        })}
          </CDBSidebarMenu>
        </CDBSidebarContent>


        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px",
            }}
          >
            <button onClick={handleLogout} className="btn btn-info mx-2">
              Logout
            </button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

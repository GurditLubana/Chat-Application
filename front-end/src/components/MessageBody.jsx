/* eslint-disable react-hooks/exhaustive-deps */
import { React, useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import "./MessageBody.css";
import SocketContext from "../Context/socketContext.js";
import ConnectedUsers from "./ConnectedUsers.jsx";

export default function MessageBody(props) {
  const socket = useContext(SocketContext);
  const [messageList, setMessageList] = useState([]);
  const [senderID, setSenderID] = useState("");
  const lastMessageRef = useRef(null);


  useEffect(() => {
    if (socket) {
      socket.on("messageList", (list) => {
        setMessageList(list);
      });
      
      socket.on("updateScreen", (newMessage) => {
        setMessageList((currentList) => [...currentList, newMessage ]);
        setSenderID(newMessage.sender);
       
      });

      return () => {
        socket.off("messageList");
        socket.off("updateScreen");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      const alignment = senderID === socket.id? "msgSent":"msgRcvd";
      lastMessageRef.current.classList.add(alignment);
    }
  }, [messageList]); 

  return (
    <>

      <Container id="msgBody" className="msgBody ">
        <ul className="msgs d-flex  col-12" id="messageList">
          {messageList.map((eachMessage, index) => (
            <li className={"newMsg my-2 py-1 px-2"}  key={index} ref={index === messageList.length - 1 ? lastMessageRef : null}>
              {eachMessage.message}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

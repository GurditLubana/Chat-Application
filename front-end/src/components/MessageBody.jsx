import { React, useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import "./MessageBody.css";
import SocketContext from "../Context/socketContext.js";

export default function MessageBody(props) {
  const socket = useContext(SocketContext);
  const [messageList, setMessageList] = useState([]);
  const lastMessageRef = useRef(null);

  
  useEffect(() => {
    if (socket) {
      socket.on("messageList", (list) => {
        setMessageList(list);
      });

      socket.on("updateScreen", (message) => {
        setMessageList((currentList) => [...currentList, { message }]);
        console.log("All the connected screens needs to be updated")
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
    }
  }, [messageList]); 

  return (
    <div className="col-12">
      <Container className="msgBody">
        <ul className="msgs d-flex  col-12" id="messageList">
          {messageList.map((eachMessage, index) => (
            <li className="newMsg my-2 py-1 px-2" key={index} ref={index === messageList.length - 1 ? lastMessageRef : null}>
              {eachMessage.message}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

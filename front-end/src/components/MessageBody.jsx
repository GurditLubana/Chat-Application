import {React,useContext, useState} from "react";
import Container from "react-bootstrap/Container";
import "./MessageBody.css";
import SocketContext from '../Context/socketContext.js';


export default function MessageBody(props) {
  const socket = useContext(SocketContext);
  const [messageList, setMessageList ]= useState([])
    if (socket) {
      console.log("Socket is available");
      socket.on("messageList", (m) => {
        console.log("Received something and its type is ", m);
        setMessageList(m)
      });

    }

  return (
    <div>
      <Container className="msgBody">
        <ul className="msgs d-flex  col-12">{messageList.map((message, index) => <li className="newMsg my-2 py-1 px-2" key={index}>{message.message}</li>)}</ul>
      </Container>
    </div>
  );
}

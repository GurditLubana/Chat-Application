import {React,useContext, useEffect,useState} from "react";
import Container from "react-bootstrap/Container";
import "./MessageBody.css";
import SocketContext from '../Context/socketContext.js';


export default function MessageBody(props) {
  const socket = useContext(SocketContext);
  const [messageList, setMessageList ]= useState([])
  useEffect(() => {
    if (socket) {
      // Attach event listener
      socket.on("messageList", (list) => {
        setMessageList(list);
      });

      socket.on("updateScreen", (message) => {
        console.log(message);
        setMessageList((currentList) => [...currentList, { message }]);
      });

      // Return a cleanup function to detach event listeners
      return () => {
        socket.off("messageList");
        socket.off("updateScreen");
      };
    }
  }, [socket]);

  return (
    <div>
      <Container className="msgBody">
        <ul className="msgs d-flex  col-12" id="messageList">{messageList.map((eachMessage, index) => <li className="newMsg my-2 py-1 px-2" key={index}>{eachMessage.message}</li>)}</ul>
      </Container>
    </div>
  );
}

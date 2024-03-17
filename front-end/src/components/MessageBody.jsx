import {React,useContext, useEffect} from "react";
import Container from "react-bootstrap/Container";
import "./MessageBody.css";
import SocketContext from '../Context/socketContext.js';


export default function MessageBody(props) {
  const socket = useContext(SocketContext);
  // console.log(socket)
  // socket.on("messageList",(m)=>{
  //   console.log("recived something", m);
  // })
  // console.log("latest list: ", props.messageList);

  // useEffect(() => {
    if (socket) {
      console.log("Socket is available");
      socket.on("messageList", (m) => {
        console.log("Received something", m);
      });

      // Cleanup to remove the event listener when the component unmounts or if the socket changes
      // return () => {
      //   socket.off("messageList");
      // };
    } else {
      console.log("Socket is not available");
    }
  // }, [socket]);

  return (
    <div>
      <Container className="msgBody">
        <ul className="msgs d-flex  col-12">{props.messageList.map((message, index) => <li className="newMsg my-2 py-1 px-2" key={index}>{message}</li>)}</ul>
      </Container>
    </div>
  );
}

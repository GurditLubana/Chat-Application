/* eslint-disable react-hooks/exhaustive-deps */
import { React, useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import "./MessageBody.css";
import SocketContext from "../Context/socketContext.js";
import Sendmsg from "./SendMsg";


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
        // console.log(newMessage);
        setMessageList((currentList) => [...currentList, newMessage ]);
        setSenderID(newMessage.sender.id);
       
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
      console.log("this is senders id: ",senderID, "  this is propsID", props.userDetails)
      const alignment = senderID === props.userDetails.id? "msgSent":"msgRcvd";
      lastMessageRef.current.classList.remove("msgRcvd")
      lastMessageRef.current.classList.add(alignment);
    }
  }, [messageList]); 

  return (
    <div id="msgBody" className="msgBody ">

      <Container  >
        <ul className="msgs d-flex mb-5 col-12" id="messageList">
          {messageList.map((eachMessage, index) => (
            
            <li className={`newMsg my-2 mx-3 py-1 px-2 ${eachMessage.sender === props.userDetails.id? "msgSent":"msgRcvd"}`}  key={index} ref={index === messageList.length - 1 ? lastMessageRef : null}>
              {eachMessage.message}
            </li>
          ))}
        </ul>
      </Container>
      <Sendmsg setMsgList={setMessageList} userDetails={props.userDetails}/>


    </div>
  );
}

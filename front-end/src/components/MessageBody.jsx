import { React, useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import SocketContext from "../socketContext";
import "./MessageBody.css";

export default function MessageBody(props) {
  console.log("latest list: ", props.messageList);
  
  // var list = (document.getElementsByClassName("msgBody"))[0];

  return (
    <div>
      <Container className="msgBody">
        <ul className="msgs d-flex  col-12">{props.messageList.map((message, index) => <li className="newMsg my-2 py-1 px-2" key={index}>{message}</li>)}</ul>
      </Container>
    </div>
  );
}

import React from "react";
import Container from "react-bootstrap/Container";
import "./MessageBody.css";

export default function MessageBody(props) {
  console.log("latest list: ", props.messageList);

  return (
    <div>
      <Container className="msgBody">
        <ul className="msgs d-flex  col-12">{props.messageList.map((message, index) => <li className="newMsg my-2 py-1 px-2" key={index}>{message}</li>)}</ul>
      </Container>
    </div>
  );
}

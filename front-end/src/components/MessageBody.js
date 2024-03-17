import {React, useContext, useEffect, useState}from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import SocketContext from '../socketContext';
import "./MessageBody.css";

export default function MessageBody() {
  return (
    <div>
      <Container className='msgBody'>

      </Container>
    </div>
  )
}

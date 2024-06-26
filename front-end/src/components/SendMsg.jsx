import {React, useContext, useState}from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import "./SendMsg.css"
import SocketContext from '../Context/socketContext';

export default function Sendmsg(props) {

  const socket = useContext(SocketContext)
  const[currentMsg, setNewMsg] = useState("");

  function handlesubmit(e){
    e.preventDefault()
    setNewMsg('');
    if(socket){
      const sender = props.userDetails;
      socket.emit("newMessage", {message:currentMsg, sender:sender })
      props.setMsgList(list => [...list,currentMsg])
    }
   
  }
  function handleChange(e) {
    setNewMsg(e.target.value);
  }

  return (
    <div>
     
      <Container className='inputMsg'>
        
          <Form className="d-flex col-12" onSubmit={handlesubmit}>
            <Form.Control
              type="text"
              placeholder="Enter your message here..."
              className="me-2 inputForm "
              aria-label="Search"
              value={currentMsg}
              onChange={handleChange}
              
            />
            <Button className="sendMsgBtn" type='submit' variant="outline-success">Send</Button>
          </Form>
      </Container>
 
    </div>
  )
}

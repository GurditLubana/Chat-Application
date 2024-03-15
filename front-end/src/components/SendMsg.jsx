import {React, useEffect, useState}from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import "./SendMsg.css"

export default function Sendmsg() {

  const[currentMsg, setNewMsg] = useState("");

  // useEffect(()=>{
  //   setNewMsg(currentMsg)
  // }, [])

  function handlesubmit(e){

    e.preventDefault()
    console.log(currentMsg)
  }

  return (
    <div>
     
      <Container className='inputMsg'>
        
          <Form className="d-flex col-12">
            <Form.Control
              type="text"
              placeholder="Enter your message here..."
              className="me-2 inputForm "
              aria-label="Search"
              value={currentMsg}
              onChange={()=>{
                var newValue = (document.getElementsByClassName("inputForm"))
                setNewMsg(newValue[0].value)}}
              
            />
            <Button type='submit' onClick= {(event)=>{handlesubmit(event)}} variant="outline-success">Send</Button>
          </Form>
      </Container>
 
    </div>
  )
}

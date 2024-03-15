import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import "./SendMsg.css"

export default function Sendmsg() {
  return (
    <div>
     
      <Container className='inputMsg'>
        
          <Form className="d-flex col-12">
            <Form.Control
              type="text"
              placeholder="Enter your message here..."
              className="me-2 inputForm "
              aria-label="Search"
              
            />
            <Button variant="outline-success">Send</Button>
          </Form>
      </Container>
 
    </div>
  )
}

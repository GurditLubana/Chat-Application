import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./Login.css";
import SignUp from "./SignUp";

export default function Login() {
    const [haveAccount, setHaveAccount] = useState(false);
  return (
    <div className="loginPage container">
      <div className="appLogo col-4 ">
        <img src=".\images\chit-chat.png" alt="chit-chat logo"></img>
      </div>
      <div className="loginForm col-8 ">
        {haveAccount?(
            <Container className="login-container">
            <Row className="justify-content-md-center">
              <Col md={6} className="login-box">
                <h2 className="text-center fw-normal mb-4">Login</h2>
                <Button variant="primary" className="mb-2 w-100">
                  Facebook
                </Button>
                <Button variant="danger" className="mb-2 w-100">
                  Google
                </Button>
                <Button variant="info" className="mb-4 w-100">
                  Twitter
                </Button>
  
                <Form>
                  
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" />
                  </Form.Group>
  
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
  
                 
                  <Button
                    variant="primary"
                    type="submit "
                    className="w-100 mt-3 mb-2"
                  >
                    Login
                  </Button>
                </Form>

              </Col>
            </Row>
          </Container>
            ):(
            <SignUp setHaveAccount={setHaveAccount}/>
        )}
        
      </div>
    </div>
  );
}

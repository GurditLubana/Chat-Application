import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./Login.css";
import SignUp from "./SignUp";

export default function Login(props) {
    const [haveAccount, setHaveAccount] = useState(false);
    const handleLoginClick= ()=>{
        props.onLogin("hello", "dfd");
    }
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
                <Button variant="primary" className="oAuth fb mb-2 w-100"><img className="btnLogo me-3" src=".\svg\facebook.svg" alt="" />
                  Facebook
                </Button>
                <Button variant="danger" className="oAuth google mb-2 w-100"><img className="btnLogo me-3" src=".\svg\google.svg" alt="" />
                  Google
                </Button>
                <Button variant="info" className="oAuth twitter mb-4 w-100"><img className="btnLogo me-3" src=".\svg\twitter.svg" alt="" />
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
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                </Form>

              </Col>
            </Row>
          </Container>
            ):(
            <SignUp setHaveAccount={setHaveAccount} onSignup={props.onLogin}/>
        )}
        
      </div>
    </div>
  );
}

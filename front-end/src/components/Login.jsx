import React, { useState, useContext, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import SocketContext from "../Context/socketContext.js";
import SignUp from "./SignUp.jsx";
import "./Login.css";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';



export default function Login(props) {
  const [haveAccount, setHaveAccount] = useState(false);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const handleGoogleClick = () => {
    
    if (socket) {
      socket.emit("googleClicked", "Sign in using google");
    }
  };

  const handleLoginClick = () => {
    props.onLogin("hello", "dfd");
  };

  useEffect(() => {
    if (socket) {
      socket.on("googleClientID", (id) => {
        const callbackUrl = `${window.location.origin}`;
        const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
          callbackUrl
        )}&response_type=token&client_id=${id}&scope=openid%20email%20profile`;
        window.location.href = targetUrl;
      });

      return () => {
        socket.off("messageList");
        socket.off("updateScreen");
      };
    }
  }, [socket]);

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
  
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken);
 
      navigate("/chat");
    }
  }, [navigate]);
  return (
    <div className="loginPage container">
      <div className="appLogo col-4 ">
        <img src=".\images\chit-chat.png" alt="chit-chat logo"></img>
      </div>
      <div className="loginForm col-8 ">
        {haveAccount ? (
          <Container className="login-container">
            <Row className="justify-content-md-center">
              <Col md={6} className="login-box">
                <h2 className="text-center fw-normal mb-4">Login</h2>
                <Button variant="primary" className="oAuth fb mb-2 w-100">
                  <img
                    className="btnLogo me-3"
                    src=".\svg\facebook.svg"
                    alt=""
                  />
                  Facebook
                </Button>
                <Button
                  onClick={handleGoogleClick}
                  variant="danger"
                  className="oAuth google mb-2 w-100"
                >
                  <img className="btnLogo me-3" src=".\svg\google.svg" alt="" />
                  Google
                </Button>
                <Button variant="info" className="oAuth twitter mb-4 w-100">
                  <img
                    className="btnLogo me-3"
                    src=".\svg\twitter.svg"
                    alt=""
                  />
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
        ) : (
          <SignUp setHaveAccount={setHaveAccount} handleGoogleClick={handleGoogleClick}/>
        )}
      </div>
    </div>
  );
}

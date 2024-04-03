import React from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";

export default function SignUp(props) {

    function displayLogin(){
        props.setHaveAccount(true);
    }
  return (
    <Container className="sign-up-container">
            <Row className="justify-content-md-center">
              <Col md={6} className="sign-up-box">
                <h2 className="text-center fw-normal mb-4">Sign up</h2>
  
                <Button variant="primary" className="mb-2 w-100">
                  Facebook
                </Button>
                <Button variant="danger" className="mb-2 w-100">
                  Google
                </Button>
                <Button variant="info" className="mb-4 w-100">
                  Twitter
                </Button>
  
                <section className="orLine">
                  <Row className="my-3">
                    <Col className="d-flex justify-content-center align-items-center">
                      <div className="line"></div>
                    </Col>
                    <Col xs={2} className="text-center">
                      or
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                      <div className="line"></div>
                    </Col>
                  </Row>
                </section>
  
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control type="text" placeholder="Full Name" />
                  </Form.Group>
  
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" />
                  </Form.Group>
  
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
  
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicConfirmPassword"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </Form.Group>
  
                  <Button
                    variant="primary"
                    type="submit "
                    className="w-100 mt-3 mb-2"
                  >
                    Sign up
                  </Button>
                </Form>

                <button onClick={displayLogin} className='haveAccount'>Already have an account?</button>
              </Col>
            </Row>
          </Container>
  )
}

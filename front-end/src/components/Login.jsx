import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./Login.css";

export default function Login() {
  return (
    <div className="loginPage container">
      <div className="col-4">hello world</div>
      <div className="loginForm col-8">
        {/* <h1 className='container'>Sign up</h1>
        <section className='oAuth'>
            <button className='btn btn-dark m-2'>Gmail</button>
            <button className='btn btn-dark m-2'>Twitter</button>
            <button className='btn btn-dark m-2'>Facebook</button>
        </section>
        <section className='orLine'>
        <Row className="my-4">
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

    <Form >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>*/}

        <Container className="sign-up-container">
          <Row className="justify-content-md-center">
            <Col md={6} className="sign-up-box">
              <h2 className="text-center mb-3">Sign up</h2>

              <Button variant="primary" className="mb-2 w-100">
                Facebook
              </Button>
              <Button variant="danger" className="mb-2 w-100">
                Google
              </Button>
              <Button variant="info" className="mb-4 w-100">
                Twitter
              </Button>

              {/* <DividerWithText text="or" /> */}

              <section className="orLine">
                <Row className="my-4">
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
                {/* <FormInput label="Full name" type="text" placeholder="Enter your full name" />
            <FormInput label="Email" type="email" placeholder="Enter your email" />
            <FormInput label="Password" type="password" placeholder="Create a password" />
            <Button variant="primary" type="submit" className="w-100 mt-3 mb-2">
              Sign up
            </Button> */}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit "
                  className="w-100 mt-3 mb-2"
                >
                  Submit
                </Button>
              </Form>

              <p className="text-center mt-3">
                <span className="text-muted">I already have an account</span> |{" "}
                <span>Terms of service apply</span>
              </p>

              {/* <DividerWithText text="Continue as guest" /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

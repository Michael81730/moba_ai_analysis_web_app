'use client';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";
import { login } from '@/app/server_actions'

import LoadingModal from '@/components/loading_modal'

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string|null>(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const handleClickLoginBtn = async (e: any) => {
    setShowLoadingModal(true);
    e.preventDefault();
    console.log("Clicked login button!");

    // validate parameters
    if (username.length < 8 || password.length > 12) {
      setError("Username format is invalid");
      setShowLoadingModal(false);
      return;
    }

    const response = await login(username, password);
    console.log("Login response:", response);
    setError(response?.error);
    setShowLoadingModal(false);
  };
  
  return (
    <>
    <Form>
      {
        error ?
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
         {error}
        </Alert> : <></>
      }
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formRememberMe">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
        </Col>
        <Col className="text-end">
          <a href="password-reset">Forgot Password?</a>
        </Col>
      </Row>
      <Button className="mb-3" variant="primary" type="button" onClick={handleClickLoginBtn}>
        Log in
      </Button>
      <Form.Group>
        Don't have an account?
        <a href="signup" className="ms-2">Sign up</a>
      </Form.Group>
    </Form>
    <LoadingModal show={showLoadingModal} text={"Logging in..."}></LoadingModal>
    </>
  );
}

export default LoginForm;
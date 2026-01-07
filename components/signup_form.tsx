'use client';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";
import { signup } from '@/app/server_actions'

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string|null>(null);

  const handleClickSignupBtn = async (e: any) => {
    e.preventDefault();
    console.log("Clicked signup button!");
    if (username.length < 8 || password.length > 12) {
      setError("Username format is invalid");
      return;
    }

    if (password.length < 8 || password.length > 16) {
      setError("Password format is invalid");
      return;
    }

    if (password != confirmPassword) {
      setError("Password and confirmation password do not match");
      return;
    }

    const response = await signup(username, email, password);
    console.log("Signup response:", response);
    setError(response?.error);
  };

  return (
    <Form >
      {
        error ?
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
         {error}
        </Alert> : <></>
      }
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
        <Form.Text className="text-muted">
          Username should be 6-12 characters long and include only alphanumeric characters.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <Form.Text className="text-muted">
          Password should be 8-16 characters long and use a mix of uppercase letters, lowercase letters, numbers, and symbols. 
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
      </Form.Group>
      <Button className="mb-3" variant="primary" type="button" onClick={handleClickSignupBtn}>
        Sign up
      </Button>
    </Form>
  );
}

export default SignupForm;
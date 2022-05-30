import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Signup.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateofBirth, setDateofBirth] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const submitHandler = () => {
    const userLoginData = JSON.stringify({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dateofBirth: dateofBirth,
      returnSecureToken: true,
    });

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtalPDDFBNpI0wLvZfC7exMoLQhLSu9QA",
        userLoginData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        history.push("/mainpage");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="content_style">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <h1 className="navbar-expand-lg">Sign Up Page</h1>
            <div>
              <Link to="/login" className="btn btn-outline-success">
                Login
              </Link>
              <Link to="/mainpage" className="btn btn-outline-success">
                Home
              </Link>
            </div>
          </div>
        </nav>
        <hr />
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <div>
              <h1>Sign Up</h1>
            </div>
            <Form.Group size="lg" controlId="first">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="last">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="date">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                autoFocus
                type="date"
                onChange={(e) => setDateofBirth(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="button-style">
              <Button
                block="true"
                size="lg"
                type="submit"
                onClick={submitHandler}
                disabled={!validateForm()}
              >
                Signup
              </Button>
              <Link to="/mainpage">
                <Button
                  style={{ marginLeft: "10px" }}
                  block="true"
                  size="lg"
                  type="button"
                >
                  Back
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

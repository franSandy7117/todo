import React, { useState, useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/authCntext";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const loginhandler = () => {
    const userLoginData = JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    });

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtalPDDFBNpI0wLvZfC7exMoLQhLSu9QA",
        userLoginData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then(function (response) {
        authCtx.login(response.data.idToken);
        authCtx.useemail(response.data.email);
        history.push("/mainpage");
      })
      .catch(function (error) {
        setErrormsg(error);
      });
  };

  return (
    <div>
      <div className="content_style">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <h1 className="navbar-expand-lg">Login Page</h1>
            <div>
              <Link to="/signup" className="btn btn-outline-success">
                Register
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
              <h1>Login</h1>
            </div>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onClick={loginhandler}
                disabled={!validateForm()}
              >
                Login
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
            <div>
              <p>{errormsg}</p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

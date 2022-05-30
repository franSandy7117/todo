import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import api from "../store/api/api";
import AuthContext from "../store/authCntext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// import "./Createtodo.css";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complitionTime, setComplitionTime] = useState("");
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const email = authCtx.userEmail;
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
  }

  const submitHandler = () => {
    api.post("userdata.json", {
      title: title,
      description: description,
      complitionTime: complitionTime,
    })
    .then(function (response) {
      console.log(response);
      history.push("/mainpage");
    })
    .catch(function (error) {
      // history.push("/homepage");
    });
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div>
      <div className="mainpage_style">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <h1 className="navbar-expand-lg">Create Todo</h1>
            {isLoggedIn && (
              <div className="dropdown">
                <button className="btn btn-outline-success">
                  <FontAwesomeIcon style={{ fontSize: "30px" }} icon={faUser} />
                </button>
                <div className="dropdown-content">
                  <div>
                    <Link to="/mainpage">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={logoutHandler}
                      >
                        Log out
                      </button>
                    </Link>
                  </div>
                  <h6>{email}</h6>
                </div>
              </div>
            )}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              style={{ justifyContent: "end" }}
              className="collapse navbar-collapse"
              id="navbarNav"
            >
              <div>
                <ul className="navbar-nav">
                  <li>
                    <Link
                      to="/completed"
                      className="nav-link"
                      aria-current="page"
                    >
                      Completed
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/incompleted"
                      className="nav-link"
                      aria-current="page"
                    >
                      Incompleted
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/timenotarrived"
                      className="nav-link"
                      aria-current="page"
                    >
                      timenotarrived
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <Link to="/mainpage" className="btn btn-outline-success">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <hr />
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <div>
              <h1>Add New</h1>
            </div>
            <hr />
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group size="lg" controlId="description">
              <Form.Label>Description</Form.Label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Form.Group>
            <br />
            <Form.Group size="lg" controlId="date">
              <Form.Label>Complition Time</Form.Label>
              <Form.Control
                autoFocus
                type="date"
                onChange={(e) => setComplitionTime(e.target.value)}
              />
            </Form.Group>
            <div className="button-style">
              <Button
                block="true"
                size="lg"
                type="button"
                onClick={submitHandler}
              >
                Create
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

export default CreateTodo;

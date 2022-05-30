import React, { useEffect, useState, useContext } from "react";
import "./Mainpage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../store/authCntext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Todo from "./Todo";
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Mainpage = () => {
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const email = authCtx.userEmail;
  const [todos, setTodos] = React.useState([{}]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("https://todo-8adda-default-rtdb.firebaseio.com/userdata.json")
      .then(function (response) {
        console.log(response)
        const loadedData = [];
        for (const key in response.data) {
          loadedData.push({
            ...response.data[key],
            id: key,
          });
        }
        setTodos(loadedData);
      })
      .catch(function (error) {
        // console.log(error);
        setError("Something went wrong");
      });
  }, []);

  const logoutHandler = () => {
    authCtx.logout();
  };
  

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div>
      <div className="mainpage_style">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <h1 className="navbar-expand-lg">Todo List</h1>
            {isLoggedIn && (
                <div className="dropdown">
                  <button className="btn btn-outline-success">
                    <FontAwesomeIcon
                      style={{ fontSize: "30px" }}
                      icon={faUser}
                    />
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
              {isLoggedIn && (
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
                    <li>
                      <Link
                        to="/createtodo"
                        className="nav-link"
                        aria-current="page"
                      >
                        Createtodo
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              {!isLoggedIn && (
                <div>
                  <Link to="/login" className="btn btn-outline-success">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-outline-success"
                    type="submit"
                  >
                    Register
                  </Link>
                </div>
              )}

              
            </div>
          </div>
        </nav>
        <hr />
        <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Mainpage;

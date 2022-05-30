import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/authCntext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Completed = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const email = authCtx.userEmail;

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <div>
      <div className="mainpage_style">
        <nav className="navbar navbar-expand-md">
          <div className="container-fluid">
            <h1 className="navbar-expand-lg">Completed Todo</h1>
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
              {isLoggedIn && (
                <div>
                  <ul className="navbar-nav">
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
              {isLoggedIn && (
                <div>
                  <Link to="/mainpage" className="btn btn-outline-success">
                    Home
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
        <hr />
      </div>
    </div>
  );
};

export default Completed;

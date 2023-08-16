import React from "react";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");
  useEffect(() => {
    setIsLoggedIn(!!jwtToken);
  });

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="logo" href="/">
          Medium
        </a>
        <div className="menu">
          <a href="/">Home</a>
          <a href="/add">Write</a>
          <a href="/signup">Register</a>
          {isLoggedIn ? (
            <a onClick={handleLogout}>Logout</a>
          ) : (
            <a href="/login">Login</a>
          )}
          <i onClick={toggleModal} class="fa fa-user fa-lg"></i>
          {modal && (
            <div className="commentmodal1" onClick={toggleModal}>
              <div className="modalContent1">
                <div className="modalHeader1">
                  <span class="close" onClick={toggleModal}>
                    &times;
                  </span>
                  <ul>
                    <li>
                      <Link
                        to={"/myprofile"}
                        style={{ color: "black", fontWeight: "600" }}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <Link
                        to={"/mypost"}
                        style={{ color: "black", fontWeight: "600" }}
                      >
                        Posts
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/savedpost"}
                        style={{ color: "black", fontWeight: "600" }}
                      >
                        Saved Posts
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/payment"}
                        style={{ color: "black", fontWeight: "600" }}
                      >
                        Buy Premium
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/topposts"}
                        style={{ color: "black", fontWeight: "600" }}
                      >
                        Top Posts
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/draft"}
                        style={{ color: "black", fontWeight: "600" }}
                      >
                        Drafts
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/followers"}
                        style={{ color: "black", fontWeight: "600" }}
                      >
                        Followers
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import logg from "../image/Capture33.png";
import {
  Search,
  ShoppingCartOutlined,
  Person,
  ExitToApp,
  AcUnit,
} from "@material-ui/icons";
import { logOut } from "../redux/apiCalls";

import { useDispatch, useSelector } from "react-redux";

const Image = styled.img`
  width: 160px;
  ${mobile({ width: "130px", marginRight: "20px" })}
`;
function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const logOutUser = () => {
    // e.preventDefault();
    localStorage.clear();
    window.location.reload(false);
    logOut(dispatch);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
              <AcUnit fontSize="large" /> CRONOS
            </Link>

            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <div className=" dropdown">
                  <button className=" dropbtn">
                    <Person />
                    <i className="fa fa-caret-down"></i>
                  </button>

                  <div className="dropdown-content">
                    {!user ? (
                      <>
                        <NavLink
                          to="/login"
                          className={({ isActive }) =>
                            "nav-links" + (isActive ? " activated" : "")
                          }
                        >
                          Log in
                        </NavLink>
                        <NavLink
                          to="/register"
                          className={({ isActive }) =>
                            "nav-links" + (isActive ? " activated" : "")
                          }
                        >
                          Create account
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/myAccount"
                          className={({ isActive }) =>
                            "nav-links" + (isActive ? " activated" : "")
                          }
                        >
                          My account
                        </NavLink>
                        <NavLink
                          to="/orders"
                          className={({ isActive }) =>
                            "nav-links" + (isActive ? " activated" : "")
                          }
                        >
                          Orders
                        </NavLink>
                      </>
                    )}

                    <NavLink
                      to="/contactus"
                      className={({ isActive }) =>
                        "nav-links" + (isActive ? " activated" : "")
                      }
                    >
                      Contact us
                    </NavLink>
                    {user && (
                      <NavLink
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={() => {
                          closeMobileMenu();
                          logOutUser();
                        }}
                      >
                        <ExitToApp />
                        Logout
                      </NavLink>
                    )}
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

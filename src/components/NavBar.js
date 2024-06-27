import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen);
  };

  const handleNavItemClick = () => {
    setExpanded(false);
    setDropdownOpen(false);
  };

  const loggedInIcons = (
    <>
      <NavLink className={styles.NavLink} to="/feed" onClick={handleNavItemClick}>
        <i className="fas fa-stream"></i> Feed
      </NavLink>
      <NavDropdown
        className={styles.Dropdown}
        show={dropdownOpen}
        onToggle={handleDropdownToggle}
        title={
          <span className={styles.DropdownToggle}>
            <Avatar src={currentUser?.profile_image} text={currentUser?.username || "Profile"} height={40} />
          </span>
        }
        id="dropdown-custom-components"
      >
        <NavDropdown.Item as={NavLink} to={`/profiles/${currentUser?.profile_id}`} className={styles.DropdownItem} onClick={handleNavItemClick}>
          <i className="fas fa-user"></i> Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/posts/create" className={styles.DropdownItem} onClick={handleNavItemClick}>
          <i className="far fa-plus-square"></i> Add post
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/liked" className={styles.DropdownItem} onClick={handleNavItemClick}>
          <i className="fas fa-heart"></i> Liked
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => { handleSignOut(); handleNavItemClick(); }} className={styles.DropdownItem}>
          <i className="fas fa-sign-out-alt"></i> Sign out
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink className={styles.NavLink} to="/signin" onClick={handleNavItemClick}>
        <i className="fas fa-sign-in-alt"></i> Sign in
      </NavLink>
      <NavLink to="/signup" className={styles.NavLink} onClick={handleNavItemClick}>
        <i className="fas fa-user-plus"></i> Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top" ref={ref}>
      <Container>
        <NavLink to="/" onClick={handleNavItemClick}>
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
            setDropdownOpen(false);
          }}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink exact className={styles.NavLink} to="/" onClick={handleNavItemClick}>
              <i className="fas fa-home"></i> Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
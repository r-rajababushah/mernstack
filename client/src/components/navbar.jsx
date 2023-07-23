import React from "react";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import "./navbar.css";

// Here, we display our Navbar
export default function Navbar() {
    return (
        <nav className="nav">
            <NavLink id="home" to="/">
                Home
            </NavLink>
            <NavLink id="createtodo" to="/create">
                Create Todo
            </NavLink>
        </nav>
    );
}
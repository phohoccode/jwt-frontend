import { NavLink } from 'react-router-dom';

import './Nav.scss'

const Nav = () => {
    return (
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/news">News</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
        </ul>
    );
}

export default Nav;
import { NavLink, useLocation } from 'react-router-dom';

import './Nav.scss'
import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../context/UserContext';

const Nav = () => {
    const location = useLocation()
    const { user } = useContext(UserContext)
    
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <>
            {(user && user.isAuthenticated || location.pathname === '/login') &&
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">Users</NavLink>
                    </li>
                </ul>}
        </>
    );
}

export default Nav;
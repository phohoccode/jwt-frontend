import { NavLink, useLocation} from 'react-router-dom';

import './Nav.scss'
import { useEffect, useState } from 'react';

const Nav = () => {
    const location = useLocation()
    const [isShow, setIsShow] = useState(true)

    useEffect(() => {
        if (location.pathname === '/login') {
            setIsShow(false)
        }
    }, [])

    return (
        <>
            {isShow &&
                <ul className='container'>
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
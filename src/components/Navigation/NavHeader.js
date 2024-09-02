import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { toast } from 'react-toastify';

import './Nav.scss'
import { logoutUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';

const NavHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useContext(UserContext)

    useEffect(() => {
        console.log(user);
    }, [user])

    const handleLogout = async () => {
        const response = await logoutUser()
        localStorage.removeItem('jwt')
        if (response && +response.EC === 0) {
            logout()
            toast.success('Đăng xuất thành công!')
            navigate('/login')
        } else {
            toast.error(response.EM)
        }
    }

    return (
        <>
            {(user && user.isAuthenticated || location.pathname === '/login') &&
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand>Quản lý người dùng</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink className='nav-link' to='/'>Trang chủ</NavLink>
                                <NavLink className='nav-link' to='/group-role'>Quyền hạn nhóm</NavLink>
                                <NavLink className='nav-link' to='/roles'>Quyền hạn</NavLink>
                                <NavLink className='nav-link' to='/users'>Quản lý người dùng</NavLink>
                            </Nav>
                            <Nav>
                                {user && user.isAuthenticated ?
                                    <>
                                        <Nav.Item className='nav-link'>Xin chào! {user.account.username}</Nav.Item>
                                        <NavDropdown title="Tuỳ chọn" id="basic-nav-dropdown">
                                            <NavDropdown.Item>Thay đổi mật khẩu</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={() => handleLogout()}>
                                                Đăng xuất
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </> : <Link className='nav-link' to='/login'>Đăng nhập</Link>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>}
        </>
    );
}

export default NavHeader;
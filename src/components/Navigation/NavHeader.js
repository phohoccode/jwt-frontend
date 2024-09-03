import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
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
    const { user, logout } = useContext(UserContext)

    const handleLogout = async () => {
        const response = await logoutUser()
        localStorage.removeItem('jwt')

        if (response && +response.EC === 0) {
            logout()
            localStorage.setItem('isLogin', false)
            toast.success('Đăng xuất thành công!')
            navigate('/login')
        } else {
            toast.error(response.EM)
        }
    }

    return (
        <>
            {(user && user.isAuthenticated) &&
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand>FULLSTACK - JWT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink className='nav-link' to='/'>Trang chủ</NavLink>
                                <NavLink className='nav-link' to='/users'>Quản lý người dùng</NavLink>
                                <NavLink className='nav-link' to='/roles'>Quản lý quyền hạn</NavLink>
                                <NavLink className='nav-link' to='/group-role'>Quyền hạn nhóm</NavLink>
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
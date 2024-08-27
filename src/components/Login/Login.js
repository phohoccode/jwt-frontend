import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UserContext } from '../../context/UserContext';
import { loginUser } from '../../services/userService';
import './Login.scss'

function Login() {
    const { login } = useContext(UserContext)
    const navigate = useNavigate()
    const [valueLogin, setValueLogin] = useState('')
    const [password, setPassword] = useState('')
    const [defaultValid, setDefaultValid] = useState({
        isValidValueLogin: true,
        isValidPass: true,
    });
    const [objCheckInput, setObjCheckInput] = useState(defaultValid);

    const handleLogin = async () => {
        setObjCheckInput(defaultValid)

        if (!valueLogin) {
            toast.error('Vui lòng nhập email hoặc số điện thoại!')
            setObjCheckInput((prevState) => ({
                ...prevState,
                isValidValueLogin: false,
            }));
            return
        }

        if (!password) {
            toast.error('Vui lòng nhập mật khẩu!')
            setObjCheckInput((prevState) => ({
                ...prevState,
                isValidPass: false,
            }));
            return
        }

        const userData = { valueLogin, password }
        const response = await loginUser(userData)
        console.log('>>> Login-response:\n', response)
        if (response && response.EC === 0) {
            const groupWithRoles = response.DT.groupWithRoles
            const email = response.DT.email
            const username = response.DT.username
            const token = response.DT.access_token

            const data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username }
            }

            login(data)

            toast.success(`Xin chào ${response.DT.username}`)
            navigate('/users')
        } else {
            toast.error('Thông tin tài khoản không đúng!')
        }
    }

    const hanlePressEnter = (e) => {
        if (e.code === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className='container'>
            <div className='row px-3 px-sm-0'>
                <div className='content-left col-sm-8 d-sm-block d-none'>
                    <h2 className='brand'>
                        PHOHOCCODE
                    </h2>
                    <p className='description'>
                        Phở học fullstack hoidanit
                    </p>
                </div>
                <div className='content-right col-sm-4 d-flex flex-column gap-3'>
                    <h3 className='text-center'>Đăng nhập</h3>
                    <input
                        value={valueLogin}
                        onChange={(e) => setValueLogin(e.target.value)}
                        name='username' id='username' placeholder='Địa chỉ email hoặc số điện thoại' type='text'
                        className={
                            objCheckInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'
                        }
                    />
                    <input
                        value={password}
                        onKeyDown={(e) => hanlePressEnter(e)}
                        onChange={(e) => setPassword(e.target.value)}
                        name='password' id='password' placeholder='Mật khẩu' type='password'
                        className={
                            objCheckInput.isValidPass ? 'form-control' : 'form-control is-invalid'
                        }
                    />
                    <button onClick={() => handleLogin()} className='btn btn-primary'>Đăng nhập</button>
                    <a href='#' className='text-center'>Quên mật khẩu?</a>
                    <hr />
                    <div className='d-flex justify-content-center'>
                        <Link to={'/register'} className='btn btn-success'>Tạo tài khoản mới</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
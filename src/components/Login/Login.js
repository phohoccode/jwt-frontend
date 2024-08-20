import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { loginUser } from '../../services/userService';
import './Login.scss'

function Login() {
    const navigate = useNavigate()
    const [valueLogin, setValueLogin] = useState('')
    const [password, setPassword] = useState('')
    const [defaultValid, setDefaultValid] = useState({
        isValidValueLogin: true,
        isValidPass: true,
    });
    const [objCheckInput, setObjCheckInput] = useState(defaultValid);

    useEffect(() => {
        const session = JSON.parse(sessionStorage.getItem('account'))

        if (session) {
            navigate('/')
        }
    }, [])

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

        if (response && response.data && response.data.EC === 0) {
            const data = {
                isAuthenticated: true,
                token: 'fake token'
            }

            sessionStorage.setItem('account', JSON.stringify(data))

            toast.success('Đăng nhập thành công!')
            navigate('/users')
            window.location.reload()
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
                    <h3 className='text-center'>Login</h3>
                    <input
                        value={valueLogin}
                        onChange={(e) => setValueLogin(e.target.value)}
                        name='username' id='username' placeholder='Email address or phone number' type='text'
                        className={
                            objCheckInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'
                        }
                    />
                    <input
                        value={password}
                        onKeyDown={(e) => hanlePressEnter(e)}
                        onChange={(e) => setPassword(e.target.value)}
                        name='password' id='password' placeholder='Password' type='password'
                        className={
                            objCheckInput.isValidPass ? 'form-control' : 'form-control is-invalid'
                        }
                    />
                    <button onClick={() => handleLogin()} className='btn btn-primary'>Login</button>
                    <a href='#' className='text-center'>Forgotten password?</a>
                    <hr />
                    <div className='d-flex justify-content-center'>
                        <Link to={'/register'} className='btn btn-success'>Create new account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
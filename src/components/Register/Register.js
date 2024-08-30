import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { registerNewUser } from '../../services/userService';
import './Register.scss';

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [defaultValid, setDefaultValid] = useState({
        isValidUsername: true,
        isValidEmail: true,
        isValidPhone: true,
        isValidPass: true,
        isValidConfirmPass: true,
    });
    const [objCheckInput, setObjCheckInput] = useState(defaultValid);

    const isValidInputs = () => {
        const regex = /^\S+@\S+\.\S+$/;

        setObjCheckInput(defaultValid);

        if (!username) {
            toast.error('Tên người dùng không được trống!');
            setObjCheckInput((prevState) => ({
                ...prevState,
                isValidUsername: false,
            }));
            return false;
        }

        if (!email) {
            toast.error('Email không được trống!');
            setObjCheckInput((prevState) => ({
                ...prevState,
                isValidEmail: false,
            }));
            return false;
        }

        if (!regex.test(email)) {
            toast.error('Email không đúng định dạng!');
            setObjCheckInput((prevState) => ({
                ...prevState,
                isValidEmail: false,
            }));
            return false;
        }

        if (!phone) {
            toast.error('Số điện thoại không được trống!');
            setObjCheckInput((prevState) => ({
                ...prevState,
                isValidPhone: false,
            }));
            return false;
        }

        if (phone.length < 11) {
            toast.error('Độ dài số điện thoại phải đủ 10 kí tự!');
            setObjCheckInput((prevState) => ({
                ...prevState,
                isValidPhone: false,
            }));
            return false;
        }

        if (!password) {
            toast.error('Mật khẩu không được trống!');
            setObjCheckInput((prevState) => ({
                ...prevState,
                isValidPass: false,
            }));
            return false;
        }

        if (password.length < 9) {
            toast.error('Độ dài mật khẩu phải nhiều hơn 8 kí tự!');
            setObjCheckInput((prevState) => ({
                ...prevState,
                isValidPass: false,
            }));
            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Mật khẩu không trùng khớp!');
            setObjCheckInput((prevState) => ({
                ...prevState,
                isValidConfirmPass: false,
            }));
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        const isValid = isValidInputs();
        const userData = { email, phone, username, password };

        if (isValid) {
            const response = await registerNewUser(userData) 

            if (+response.EC === 0) {
                toast.success(response.EM)
                navigate('/login')
            } else {
                toast.error(response.EM)
            }
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row px-3 px-sm-0 '>
                <div className='content-left col-sm-7 d-sm-block d-none'>
                    <h2 className='brand'>PHOHOCCODE</h2>
                    <p className='description'>Khoá học fullstack jwt trên youtube hoidanit</p>
                </div>
                <div className='content-right col-sm-5 d-flex flex-column gap-3'>
                    <h3 className='text-center'>Đăng ký tài khoản</h3>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        name='username'
                        id='username'
                        placeholder='Tên người dùng'
                        type='text'
                        className={
                            objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'
                        }
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        id='email'
                        placeholder='Địa chỉ email'
                        type='email'
                        className={
                            objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'
                        }
                    />
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        name='phone'
                        id='phone'
                        placeholder='Số điện thoại'
                        type='number'
                        className={
                            objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'
                        }
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name='password'
                        id='password'
                        placeholder='Mật khẩu'
                        type='password'
                        className={
                            objCheckInput.isValidPass ? 'form-control' : 'form-control is-invalid'
                        }
                    />
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name='retypepassword'
                        id='retypepassword'
                        placeholder='Nhập lại mật khẩu'
                        type='password'
                        className={
                            objCheckInput.isValidConfirmPass
                                ? 'form-control'
                                : 'form-control is-invalid'
                        }
                    />
                    <button onClick={() => handleRegister()} className='btn btn-primary'>
                        Đăng ký
                    </button>
                    <hr />
                    <div className='d-flex justify-content-center'>
                        <Link to={'/login'} className='btn btn-success'>
                            Đã có tài khoản?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;

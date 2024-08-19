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
        isValidEmail: true,
        isValidPhone: true,
        isValidPass: true,
        isValidConfirmPass: true,
    });
    const [objCheckInput, setObjCheckInput] = useState(defaultValid);

    useEffect(() => {

    }, []);

    const isValidInputs = () => {
        const regex = /^\S+@\S+\.\S+$/;

        setObjCheckInput(defaultValid);

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

        if (!password) {
            toast.error('Password không được trống!');
            setObjCheckInput((prevState) => ({
                ...prevState,
                isValidPass: false,
            }));
            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Mật khẩu không trùng!');
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
            const serverData = response?.data

            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                navigate('/login')
            } else {
                toast.error(serverData.EM)
            }
        }
    };

    return (
        <div className='container'>
            <div className='row px-3 px-sm-0 '>
                <div className='content-left col-sm-8 d-sm-block d-none'>
                    <h2 className='brand'>PHOHOCCODE</h2>
                    <p className='description'>Phở học fullstack hoidanit</p>
                </div>
                <div className='content-right col-sm-4 d-flex flex-column gap-3'>
                    <h3 className='text-center'>Register</h3>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        name='username'
                        id='username'
                        placeholder='Username'
                        type='text'
                        className='form-control'
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        id='email'
                        placeholder='Email address'
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
                        placeholder='Phone number'
                        type='text'
                        className={
                            objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'
                        }
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name='password'
                        id='password'
                        placeholder='Password'
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
                        placeholder='Retype password'
                        type='password'
                        className={
                            objCheckInput.isValidConfirmPass
                                ? 'form-control'
                                : 'form-control is-invalid'
                        }
                    />
                    <button onClick={() => handleRegister()} className='btn btn-primary'>
                        Register
                    </button>
                    <hr />
                    <div className='d-flex justify-content-center'>
                        <Link to={'/login'} className='btn btn-success'>
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;

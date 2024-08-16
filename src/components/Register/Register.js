import { Link } from 'react-router-dom';
import axios from 'axios'

import './Register.scss'
import { useEffect } from 'react';

function Register() {

    useEffect(() => {
        axios.get('http://localhost:8080/api/test-api')
            .then(data => {
                console.log('>>> data', data)
            })
    }, [])

    return (
        <div className='container'>
            <div className='row px-3 px-sm-0 '>
                <div className='content-left col-sm-8 d-sm-block d-none'>
                    <h2 className='brand'>
                        PHOHOCCODE
                    </h2>
                    <p className='description'>
                        Phở học fullstack hoidanit
                    </p>
                </div>
                <div className='content-right col-sm-4 d-flex flex-column gap-3'>
                    <h3 className='text-center'>Register</h3>
                    <input name='username' id='username' placeholder='Username' type='text' className='form-control' />
                    <input name='email' id='email' placeholder='Email address' type='email' className='form-control' />
                    <input name='phone' id='phone' placeholder='Phone number' type='text' className='form-control' />
                    <input name='password' id='password' placeholder='Password' type='password' className='form-control' />
                    <input name='password' id='password' placeholder='Retype password' type='password' className='form-control' />
                    <button className='btn btn-primary'>Register</button>
                    <hr />
                    <div className='d-flex justify-content-center'>
                        <Link to={'/login'} className='btn btn-success'>Already account?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
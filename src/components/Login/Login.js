import { Link } from 'react-router-dom';
import './Login.scss'

function Login() {
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
                    <h3 className='text-center'>Login</h3>
                    <input name='username' id='username' placeholder='Email address or phone number' type='text' className='form-control' />
                    <input name='password' id='password' placeholder='Password' type='password' className='form-control' />
                    <button className='btn btn-primary'>Login</button>
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
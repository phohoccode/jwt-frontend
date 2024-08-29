import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import _ from 'lodash'
import { ThreeDots } from 'react-loader-spinner'

import './App.scss'
import Nav from "./components/Navigation/Nav"
import { useContext } from 'react'
import AppRouter from './routes/AppRouter'
import { UserContext } from './context/UserContext'

const App = () => {
    const { user } = useContext(UserContext)

    return (
        <div >
            <Router>
                {user && user.isLoading ?
                    (<div className='loading'>
                        <ThreeDots
                            height="80"
                            width="80"
                            color="#0d6efd"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            visible={true}
                        />
                    </div>) :
                    (<>
                        <Nav />
                        <AppRouter />
                    </>)}
            </Router>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default App

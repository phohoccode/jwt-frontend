import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home/Home'
import Nav from "./components/Navigation/Nav"
import Login from './components/Login/Login'
import './App.scss'
import Register from './components/Register/Register'

const App = () => {
    return (
        <div >
            <Router>
                <Nav />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/news' element={<Home />} />
                    <Route path='/about' element={<Home />} />
                    <Route path='/contact' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='*' element={<Home />} />
                </Routes>
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

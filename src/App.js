import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import _ from 'lodash'

import Nav from "./components/Navigation/Nav"
import { useEffect, useState } from 'react'
import AppRouter from './routes/AppRouter'

const App = () => {
    const [account, setAccount] = useState({})

    useEffect(() => {
        const session = JSON.parse(sessionStorage.getItem('account'))

        if (session) {
            setAccount(session)
        }
    }, [])

    return (
        <div >
            <Router>
                <Nav />
                <AppRouter />
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

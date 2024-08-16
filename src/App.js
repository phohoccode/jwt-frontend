import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Nav from "./components/Navigation/Nav";
import Login from './components/Login/Login';
import './App.scss'
import Register from './components/Register/Register';

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
        </div>
    );
}

export default App;

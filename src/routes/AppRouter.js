import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home/Home'
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import User from "../components/ManageUsers/User";
import PrivateRouter from "./PrivateRouter";

function AppRouter() {
    return (
        <>
            <Routes>
                <Route 
                    path="/users" 
                    element={
                        <PrivateRouter>
                            <User />
                        </PrivateRouter>
                    } 
                />
                
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<Home />} />
            </Routes>
        </>
    );
}

export default AppRouter;
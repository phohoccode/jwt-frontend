import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home/Home'
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import User from "../components/ManageUsers/User";
import PrivateRouter from "./PrivateRouter";
import Roles from "../components/Roles/Roles";
import GroupRole from "../components/GroupRole/GroupRole";
import Info from "../components/ManageUsers/Info";
import FindAccount from "../components/FindAccount/FindAccount";
import ResetPassword from "../components/ResetPassword/ResetPassword";

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

                <Route
                    path="/roles"
                    element={
                        <PrivateRouter>
                            <Roles />
                        </PrivateRouter>
                    }
                />

                <Route
                    path="/group-role"
                    element={
                        <PrivateRouter>
                            <GroupRole />
                        </PrivateRouter>
                    }
                />

                <Route path='/' element={<Home />} />
                <Route path='/info' element={<Info />} />
                <Route path='/login' element={<Login />} />
                <Route path='/login/identify' element={<FindAccount />} />
                <Route path='/reset-password' element={<ResetPassword />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<Home />} />
            </Routes>
        </>
    );
}

export default AppRouter;
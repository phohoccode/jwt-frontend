import React, { useEffect, useState } from "react";

import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null)

const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {}
    }
    const [user, setUser] = useState(userDefault);

    useEffect(() => {
        if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
            fetchUser()
        } else {
            const isLogin = JSON.parse(localStorage.getItem('isLogin'))
            setUser({
                ...user,
                isAuthenticated: isLogin,
                isLoading: false
            })
        }
    }, [])

    const login = (userData) => {
        setUser({ ...userData, isLoading: false })
    };

    const logout = () => {
        setUser({ ...userDefault, isLoading: false })
    };

    const fetchUser = async () => {
        const response = await getUserAccount()

        if (response && response.EC === 0) {
            const groupWithRoles = response.DT.groupWithRoles
            const email = response.DT.email
            const username = response.DT.username
            const token = response.DT.access_token

            const data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username },
                isLoading: false
            }
            console.log('data', data)
            setTimeout(() => {
                setUser(data)
            }, 1000)
        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext } 
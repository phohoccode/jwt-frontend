import React, { useEffect, useState } from "react";

import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: '',
        token: '',
        account: {}
    });

    useEffect(() => {
        fetchUser()
    }, [])

    // Login updates the user data with a name parameter
    const login = (userData) => {
        setUser(userData)
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };

    const fetchUser = async () => {
        const response = await getUserAccount()

        if (response && response.EC === 0) {
            const groupWithRoles = response.DT.groupWithRoles
            const email = response.DT.email
            const username = response.DT.username
            const token = response.DT.token

            const data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username }
            }
            setUser(data)
        }
        console.log(response)
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext } 
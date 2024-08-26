import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

function PrivateRouter({ children }) {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (!user && !user.isAuthenticated) {
            navigate('/login')
        }
    }, [])

    return children
}

export default PrivateRouter;
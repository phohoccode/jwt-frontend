import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRouter({ children }) {
    const navigate = useNavigate()

    useEffect(() => {
        const session = JSON.parse(sessionStorage.getItem('account'))

        if (!session) {
            navigate('/login')
        }
    }, [])

    return children
}

export default PrivateRouter;
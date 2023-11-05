import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";


const PrivateRoutes = ({}) => {
    const {session} = useAuth()
    console.log(session)
    return(
        session ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;   
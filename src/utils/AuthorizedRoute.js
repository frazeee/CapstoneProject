import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";


const AuthorizedRoute = ({}) => {
    const session = useAuth()
    const auth = session
    console.log(session)
    return(
        auth.access_token ?  <Navigate to="/Pets" /> : <Outlet />
    )
}

export default AuthorizedRoute;   
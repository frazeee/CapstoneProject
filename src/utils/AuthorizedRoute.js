import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";


const AuthorizedRoute = ({}) => {
    const {session} = useAuth()
    console.log(session)
    return(
      session ?  <Navigate to="/Pets" /> : <Outlet />
    )
}

export default AuthorizedRoute;   
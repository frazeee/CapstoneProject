import { Outlet, Navigate } from "react-router-dom";


const PrivateRoutes = ({session}) => {
    let auth = true
    console.log(session)
    return(
        auth ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;   
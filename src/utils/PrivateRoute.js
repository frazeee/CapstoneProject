import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Cookies from "js-cookie";


const PrivateRoutes = ({}) => {
    const session = Cookies.get('userSession')
    var userSession;
    
    if(session){
      const tokenData = JSON.parse(session);
      userSession = tokenData.data.session
    }
    else{
      userSession = null
    }

    return(
        userSession ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;   
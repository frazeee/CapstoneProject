import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Cookies from "js-cookie";


const AuthorizedRoute = ({}) => {
    const session = Cookies.get('userSession')
    var userSession;
    
    if(session){
      const tokenData = JSON.parse(session);
      userSession = tokenData.data.session
      console.log(userSession)
    }
    else{
      userSession = null
    }


    return(
      userSession ?  <Navigate to="/Pets" /> : <Outlet />
    )
}

export default AuthorizedRoute;   
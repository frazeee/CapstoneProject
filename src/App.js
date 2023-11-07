
import './App.css';
import { Login, Register, LandingPage, Pets, PetPage, AccountInformation, ApplicationPage, AdminPage } from './pages' 
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoutes from './utils/PrivateRoute';
import AuthorizedRoute from './utils/AuthorizedRoute';
import { AuthProvider } from './utils/AuthProvider';
import AdminRoute from './utils/AdminRoute';


function App() {  

 
  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element = {<AuthorizedRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
          <Route path="/pets" element={<Pets />} />
          <Route path="/petPage/:cardId" element={<PetPage />} />

          <Route element= {<PrivateRoutes  />}>
             <Route path="/accountInformation" element={<AccountInformation />} />
             <Route path="/Application" element={<ApplicationPage />}/>
          </Route>
          <Route element= {<AdminRoute  />}>
            <Route path="/Admin" element={<AdminPage />} /> 
          </Route>
        </Routes>
      </Router>
      </AuthProvider>
    </>
  );
}

export default App;

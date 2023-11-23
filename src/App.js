import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import {
  AccountInformation,
  AdminPage,
  ApplicationPage,
  LandingPage,
  Login,
  PaymentSuccessPage,
  PetPage,
  Pets,
  Register,
} from "./pages";
import AdminRoute from "./utils/AdminRoute";
import { AuthProvider } from "./utils/AuthProvider";
import AuthorizedRoute from "./utils/AuthorizedRoute";
import PrivateRoutes from "./utils/PrivateRoute";
import AccountAdoptions from "./pages/AccountAdoptions";
import InactivityTimer from "./utils/InactivityTimer";
import ShelterSignup from "./pages/ShelterSignupPage/ShelterSignup";
import CheckRequestPage from "./pages/CheckRequestPage/CheckRequestPage";
import ForgotPassword from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ShelterRegister from "./pages/ShelterRegisterPage/ShelterRegisterPage";
import EmailForm from "./pages/EmailJSTest";


function App() {
  return (
    <>
      
        <Router>
        <AuthProvider>
        <InactivityTimer/>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<AuthorizedRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route path="/pets" element={<Pets />} />
            <Route path="/petPage/:cardId" element={<PetPage />} />

            <Route element={<PrivateRoutes />}>
              <Route
                path="/accountInformation"
                element={<AccountInformation />}
              />
               <Route
                path="/adoptions" 
                element={<AccountAdoptions />}
              />
              <Route path="/Application" element={<ApplicationPage />} />
              <Route path="/Application/:petId" element={<ApplicationPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/Admin" element={<AdminPage />} />
              <Route path="/CheckApplication/:applicationId" element={<CheckRequestPage/>}/>
            </Route>
            <Route path="/payment-success/:requestId" element={<PaymentSuccessPage />} />
            <Route path="/ShelterSignup" element={<ShelterSignup/>}/>
            <Route path="/account/forgotPassword" element={<ForgotPassword/>}/>
            <Route path="/ShelterRegister" element={<ShelterRegister/>}/>
            <Route path="/EmailTest" element={<EmailForm/>}/>
          </Routes>
          </AuthProvider>
        </Router>
      
    </>
  );
}

export default App;

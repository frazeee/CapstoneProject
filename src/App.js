import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
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
              <Route path="/Application" element={<ApplicationPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/Admin" element={<AdminPage />} />
            </Route>

            <Route path="/payment-success/:requestId" element={<PaymentSuccessPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;

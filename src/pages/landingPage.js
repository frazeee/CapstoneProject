import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../utils/AuthProvider";




const LandingPage = ({}) => {
    return (
     <div>
        <Navbar/>
        <Header />
        <Footer />
    </div>
    )
        
      

}

export default LandingPage;
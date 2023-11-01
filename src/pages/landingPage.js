import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const LandingPage = ({user}) => {
    
    return (
     <div>
        <Navbar user={user}/>
        <Header />
        <Footer />
    </div>
    )
        
      

}

export default LandingPage;
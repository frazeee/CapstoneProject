import Header from "../components/Header";
import Navbar from "../components/Navbar";


const LandingPage= ({token}) => {
    return(
        <div>
        <Navbar token={token}/>
        <Header />
        </div>
    )
}
export default LandingPage;
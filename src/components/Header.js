import './Header.css';
import  HeaderBanner from '../images/HeaderBanner.jpg';

const Header = () => {
  return(
   <img src= {HeaderBanner}
        alt = "Dog from Shelter"
        className='headerBanner' />
  )
}

export default Header;
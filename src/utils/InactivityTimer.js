import { useState, useEffect } from 'react';
import { supabase } from '../components/client';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const LogoutModal = ({ show, onHide }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Logged Out</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <p>You have been logged out due to inactivity.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onHide}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InactivityTimer = () => {
  const [showModal, setShowModal] = useState(false);
  const {user} = useAuth()
  const navigate = useNavigate()
  console.log(user)

  useEffect(() => {
    let inactivityTimeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(logout, 10 * 60 * 1000); // 10 minutes
    };

    const logout = async () => {
      console.log("timeout")
      console.log("user")
      if(user){
      await supabase.auth.signOut();
      Cookies.remove("userSession")
      setShowModal(true);
    }
    };

    const handleActivity = () => {
      console.log("asasda")
      resetTimer();
    };

    resetTimer(); // Initialize the timer

    // Attach event listeners for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
    window.location.reload(false)
  };

  return (
    <>
      <LogoutModal show={showModal} onHide={closeModal} />
    </>
  );
};

export default InactivityTimer;
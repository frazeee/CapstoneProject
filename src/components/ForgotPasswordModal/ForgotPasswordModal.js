import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../components/client'; 
import { BeatLoader } from 'react-spinners'; 


const ForgotPasswordModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
 

  const openModal = () => {
    setEmail(''); 
    setStatus(null); 
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        setStatus({ type: 'error', message: error.message });
      } else {
        setStatus({ type: 'success', message: 'Password reset email sent successfully!' });
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setStatus({ type: 'error', message: 'An error occurred while sending the password reset email.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <span className="text-primary" onClick={openModal} style={{ cursor: 'pointer' }}>
        Forgot Password?
      </span>

      <div className={`modal fade ${showModal ? 'show' : ''}`} id="forgotPasswordModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Forgot Password?
              </h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {status && (
                  <div className={`mt-3 alert alert-${status.type}`} role="alert">
                    {status.message}
                  </div>
                )}
                <div className="d-flex justify-content-end mt-3">
                  {loading && <BeatLoader type="ThreeDots" color="#fee481" height={50} width={50} className="spinner align-self-center" />}
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showModal && <div className="modal-backdrop fade show" onClick={closeModal}></div>}
    </div>
  );
};

export default ForgotPasswordModal;

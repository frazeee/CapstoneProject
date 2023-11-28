import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { supabase } from '../components/client';
import { BeatLoader } from 'react-spinners';
import Cookies from 'js-cookie';



const AccountInformation = () => {
    const UserData = JSON.parse(Cookies.get("userSession"))
    const userEmail = UserData.data.user.email
    const {user} = useAuth()
    const [userData, setUserData] = useState(null)
    const [Loading, setLoading] = useState(null)
    const [modalData, setModalData] = useState({
      isOpen: false,
      message: '',
    });

    useEffect(() => {
      // Function to fetch a user by email
      async function getUserByEmail(email) {
        try {
          // Query the 'users' table in your Supabase database
         setLoading(true)
          const { data, error } = await supabase.from('Users').select('*').eq('email', email);
    
          if (error) {
            console.error('Error fetching user:', error);
            return;
          }
    
          // Set the user if found, or null if not found
          if (data && data.length > 0) {
            setUserData(data[0]);
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error('Error:', error);
        }
        finally{
          setLoading(false)
        }
      }
    
      // Call the getUserByEmail function when the email changes
      getUserByEmail(userEmail);
    }, [user]);

    
    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
    });

    useEffect(() => {
      setFormData({
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        email: userData?.email,
        phone: userData?.phone,
        address: userData?.address
      });
    }, [userData]);
    
      const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
        console.log(formData)
      };
    
      const updateUser = async () => {
        try {
          const { data, error } = await supabase.from('Users').update([formData]).eq('email', userEmail);
    
          if (error) {
            console.error('Error updating user:', error);
            setModalData({
              isOpen: true,
              message: `Error updating user: ${error.message}`,
            });
            return;
          }
    
          console.log('User updated successfully:', data);
          setModalData({
            isOpen: true,
            message: 'User updated successfully!',
          });
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const closeModal = () => {
        setModalData({
          isOpen: false,
          message: '',
        });
        window.location.reload()
      };
    

      if (Loading) {
        return (
          <>
          <Navbar/>
          <div className="d-flex justify-content-center align-items-center mt-5">
            <BeatLoader type="ThreeDots" color="#fee481" height={200} width={200} className="spinner" />
          </div>
          <h5 className='text-warning text-center'>Fetching User Data...</h5>
        </>
        );
      }

    return(

        <>        
        <Navbar />
        <div className='bg-body pb-2' style={{}}>
          <div className='container-fluid'>
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                        <div className="card shadow my-5 rounded-3 ">
                            <div className="card-body">
                                <h1 className="text-center">Account Information</h1>
                                <hr className='w-100'/>
                                <div className="row">
                                    <div className="col-md-6 my-2">
                                        <label for="last_name">First Name</label>
                                        <input type="text" className="form-control" id="first_name"
                                             defaultValue={userData?.first_name}
                                              onChange={handleInputChange}
                                              />
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label for="last_name">Last Name</label>
                                        <input type="text" className="form-control" id="last_name"
                                           defaultValue={userData?.last_name}
                                           onChange={handleInputChange}/>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label for="email">Email</label>
                                        <input type="email" className="form-control" id="email"
                                            defaultValue={userData?.email}
                                            disabled
                                            aria-disabled
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label for="phone">Phone Number</label>
                                        <input type="number" className="form-control " id="phone" 
                                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  defaultValue={userData?.phone}
                                            onChange={handleInputChange}/>
                                    </div>
                                    <div className="col-12 my-2">
                                        <label for="address">Address</label>
                                        <textarea className="form-control " id="address" rows="5"
                                            defaultValue={userData?.address}
                                            onChange={handleInputChange}></textarea>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn rounded-pill my-2 p-2 fw-bold " style={{width: "100px"}} id="updateBtn" onClick={updateUser}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>

    <div className={`modal fade ${modalData.isOpen ? 'show' : ''}`} id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: modalData.isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Status</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <p>{modalData.message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalData.isOpen && <div className="modal-backdrop fade show"></div>}

    </>
    )
}

export default AccountInformation;
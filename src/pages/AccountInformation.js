import Navbar from '../components/Navbar';


const AccountInformation = () => {

    const {email} = useAuth()
    console.log(email)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        // Function to fetch a user by email
        async function getUserByEmail(email) {
          try {
            // Query the 'users' table in your Supabase database
            const { data, error } = await supabase.from('Users').select('*').eq('email', email);
    
            if (error) {
              console.error('Error fetching user:', error);
              return;
            }
    
            // Set the user if found, or null if not found
            if (data && data.length > 0) {
              setUserData(data[0]);
              console.log(userData)
            } else {
              setUserData(null);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
    
        // Call the getUserByEmail function
        getUserByEmail(email);
      }, []);
    
      const [formData, setformData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const updateUser = async () => {
        try {
          const { data, error } = await supabase
            .from('Users')
            .update({
              first_name: userData.first_name,
              last_name: userData.last_name,
              email: userData.email,
              phone: userData.phone,
              address: userData.address,
            })
            .eq('email', userData.email);
      
          if (error) {
            console.error('Error updating user:', error);
          } else {
            console.log('User updated successfully');
          }
      
          // Update password
          const { error: passwordError } = await supabase.auth.updateUser({
            password: '123456',
          });
      
          if (passwordError) {
            console.error('Error updating password:', passwordError);
          } else {
            console.log('Password updated successfully');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    

    return(

        <>        
        <div className='body-bg pb-2'>
        <Navbar />
        <div className='container-fluid'>
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                        <div className="card my-5 rounded-3 ">
                            <div className="card-body">
                                <h1 className="text-center">Account Information</h1>
                                <hr className='w-100'/>
                                <div className="row">
                                    <div className="col-md-6 my-2">
                                        <label for="firstName">First Name</label>
                                        <input type="text" className="form-control" id="firstName"
                                             placeholder={userData?.first_name} />
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label for="lastName">Last Name</label>
                                        <input type="text" className="form-control" id="lastName"
                                           placeholder={userData?.last_name}/>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label for="email">Email</label>
                                        <input type="email" className="form-control" id="email"
                                            placeholder={userData?.email} disabled />
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label for="number">Phone Number</label>
                                        <input type="number" className="form-control " id="number" 
                                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  placeholder={userData?.phone}/>
                                    </div>
                                    <div className="col-12 my-2">
                                        <label for="address">Address</label>
                                        <textarea className="form-control " id="address" rows="5"
                                            placeholder={userData?.address}></textarea>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn rounded-pill my-2 p-2" id="updateBtn" onClick={updateUser}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    
    </>
    )
}

export default AccountInformation;
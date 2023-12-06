import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../components/client";
import "./ShelterSignup.css"
import loginPicture from "../../images/loginPicture.png";

const ShelterSignup = ({}) => {
    const [loading, setLoading] = useState(null);
    const [formData, setFormData] = useState({
        ShelterName: "",
        ShelterEmail: "",
        ShelterSocMed: "",
        ShelterPetNumber: ""
      });

    const handleInvite = async () => {
      setLoading(true);
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: formData.ShelterEmail,
        });
  
        if (error) {
          alert(error.error_description || error.message);
        } else {
          alert('Check your email for the invite link!');
        }
      } catch (error) {
        console.error('Failed to send invite:', error);
        alert('Failed to send invite. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    const handleChange = (event) => {
      console.log(formData);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value,
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
  
      try {
        const { data, error: insertError } = await supabase.from('ShelterSignup').insert([
          {
            shelter_name: formData.ShelterName,
            shelter_email: formData.ShelterEmail,
            shelter_socmed: formData.ShelterSocMed,
            shelter_petNumber: formData.PetNumber,
          },
        ]);
  
        if (insertError) {
          throw insertError;
        }
  
        // After successful signup, send an invite
        await handleInvite();
      } catch (error) {
        console.error('Error during signup:', error);
        alert('Failed to sign up. Please try again.');
      } finally {
        setLoading(false);
        setFormData({
          ShelterName: '',
          ShelterEmail: '',
          ShelterSocMed: '',
          PetNumber: '',
        });
      }
    };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
      <BeatLoader type="ThreeDots" color="#fee481" height={200} width={200} className="spinner" />
    </div>
    );
  }


   return(
    <div className="container-fluid">
      <div className="row">
        <div className="left-panel col-xl-4 col-lg-4 col-md-4 d-flex flex-column">
        <Link to="/" className="pt-3 pb-2 text-light"><i class="bi bi-arrow-left-short"></i>Back to Home</Link>
          <h1 className="text-center">Become a partner shelter today!</h1>
          <img className="img-fluid align-self-center" src={loginPicture} />
        </div>
        <div className="col-xl-8 col-lg-8 col-md-8 px-5 pt-5">
          <h1 className="formHeader">Sign Up Here!</h1>
          <hr className="w-100 mb-3" />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Shelter Name
              </label>
              <input
                type="text"
                className="form-control"
                name="ShelterName"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Shelter Social Media
              </label>
              <input
                type="text"
                className="form-control"
                name="ShelterSocMed"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Shelter Email
              </label>
              <input
                type="email"
                className="form-control"
                name="ShelterEmail"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Number of Shelter Pets
              </label>
              <input
                type="number"
                className="form-control"
                name="PetNumber"
                required
                onChange={handleChange}
              />
            </div>
            <div className="">
              <button type="submit" className="login-btn btn rounded-pill mb-2">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>

    

    
  );
};

export default ShelterSignup;

import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../components/client";
import "./ShelterSignup.css"
import BPUADOPT_LOGO from "../../images/BPUADOPT_LOGO.png"
import loginPicture from "../../images/loginPicture.png";

const ShelterSignup = ({}) => {
    const [loading, setLoading] = useState(null);
    const [formData, setFormData] = useState({
        ShelterName: "",
        ShelterEmail: "",
        ShelterSocMed: "",
        ShelterPetNumber: ""
      });

      function handleChange(event) {
        console.log(formData);
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [event.target.name]: event.target.value,
          };
        });
      }

      async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        try {
          const { data, error: insertError } = await supabase.from("ShelterSignup").insert([
            {
                ShelterName: formData.ShelterName,
                ShelterEmail: formData.ShelterEmail,
                ShelterSocMed: formData.ShelterSocMed,
                ShelterPetNumber: formData.ShelterPetNumber
            },
          ]);
    
          if (insertError) {
            throw insertError;
          }
 
        } catch (error) {
          alert(error.error_description || error.message);
        } finally {
          setLoading(false);
          setFormData("")
        }
      }

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center">
//       <BeatLoader type="ThreeDots" color="#fee481" height={200} width={200} className="spinner" />
//     </div>
//     );
//   }


   return(
    <div className="container-fluid">
      <div className="row">
        <div className="left-panel pt-3 col-xl-4 col-lg-4 col-md-4 d-flex flex-column">
            <Link to="/" className="text-light text-decoration-none">Back to home</Link>
          <h1 className="text-center">Become a partner shelter today!</h1>
          <img className="img-fluid align-self-center" src={loginPicture} />
        </div>
        <div className="col-xl-8 col-lg-8 col-md-8 px-5 pt-5">
          <h1 className="formHeader">Sign Up Here!</h1>
          <hr className="w-100 mb-3" />
          <form>
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

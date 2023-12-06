import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./AdoptionForm.css";
import { supabase } from "../client";
import { useAuth } from "../../utils/AuthProvider";
import { BeatLoader } from "react-spinners";
import Cookies from "js-cookie";

function AdoptionForm(props) {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [adoptFormData, setAdoptFormData] = useState(null);
  const [userData, setUserData] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(null);
  const UserData = JSON.parse(Cookies.get("userSession"));
  const userEmail = UserData.data.user.email;

  useEffect(() => {
    async function getUserByEmail(email) {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("Users")
          .select("*")
          .eq("email", email);

        if (error) {
          console.error("Error fetching user:", error);
          return;
        }

        if (data && data.length > 0) {
          // Set the user data in the form using setValue
          setValue("firstName", data[0].first_name);
          setValue("lastName", data[0].last_name);
          setValue("address", data[0].address);
          setValue("phone", data[0].phone);
          setValue("email", data[0].email);
        } else {
          // Handle the case when the user is not found
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    getUserByEmail(userEmail);
  }, [user, setValue]);

  const onSubmit = (data) => {
    props.parentCallback(data);
  };

  const birthdate = watch("birthdate");
  const [isUnder18, setIsUnder18] = useState(false);

  useEffect(() => {
    const bdayDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - bdayDate.getFullYear();
    setIsUnder18(age < 18);
  }, [birthdate]);

  const isAllergicValue = watch("isAllergic");
  const [hasAllergies, setHasAllergies] = useState(false);

  useEffect(() => {
    console.log(isAllergicValue);
    if (isAllergicValue === "Yes") {
      setHasAllergies(true);
    } else {
      setHasAllergies(false);
    }
  }, [isAllergicValue]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = tomorrow.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const status = ["Single", "Married", "Others"];
  const source = ["Friends", "Website", "Social Media", "Others"];
  const yesOrNo = ["Yes", "No"];
  const buildingTypes = ["House", "Apartment", "Condo", "Others"];
  const livingWith = [
    "Living Alone",
    "Parents",
    "Relative",
    "Spouse",
    "Children over 18",
    "Roommates",
  ];

  const houseInspectionItems = [
    "Front of the house",
    "Living room",
    "Bedroom/s (if your pet will have access)",
    "Front & backyard",
  ];

  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center mt-5">
          <BeatLoader
            type="ThreeDots"
            color="#fee481"
            height={200}
            width={200}
            className="spinner"
          />
        </div>
        <h5 className="text-warning text-center">Fetching User Data...</h5>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="personal-form pt-3">
        <div className="mb-3">
          <h3 className="text-primary title">Personal Details</h3>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>First Name</label>
            <input
              name="firstName"
              className="form-control"
              type="text"
              required
              {...register("firstName", { required: true })}
            ></input>
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <input
              name="lastName"
              className="form-control"
              type="text"
              defaultValue={userData.last_name}
              required
              {...register("lastName", { required: true })}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label>Address</label>
            <input
              name="address"
              className="form-control"
              type="text"
              required
              {...register("address", { required: true })}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Phone Number</label>
            <input
              name="phone"
              className="form-control"
              type="text"
              required
              {...register("phone", { required: true })}
            ></input>
          </div>
          <div className="col-md-6">
            <label>Email</label>
            <input
              name="email"
              className="form-control"
              type="email"
              defaultValue={userData?.email}
              required
              {...register("email", { required: true })}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Birthdate</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter your Birth Date"
              required
              max={getCurrentDate()}
              {...register("birthdate", { required: true })}
            />
          </div>
          <div className="col-md-6">
            <label>Status</label>
            <div className="d-flex mb-0 btn-group">
              {status.map((option) => (
                <div className="form-check mr-3 d-flex align-items-center mb-0">
                  <input
                    className="form-check-input mb-1"
                    type="radio"
                    value={option}
                    {...register("status", { required: true })}
                  />
                  <label className="form-check-label" key={option}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Occupation</label>
            <input
              className="form-control"
              type="text"
              placeholder="Please type N/A if unemployed"
              required
              {...register("occupation", { required: true })}
            ></input>
          </div>
          <div className="col-md-6">
            <label>Social Media</label>
            <input
              className="form-control"
              type="text"
              placeholder="Please type N/A if no social media"
              required
              {...register("socialMedia", { required: true })}
            ></input>
          </div>
        </div>

        {isUnder18 && (
          <>
            <div className="my-3">
              <h3 className="text-primary">Alternate Contact</h3>
              <p className="text-muted">
                If the applicant is a minor, a parent or a guardian must be the
                alternate contact and co-sign the application.
              </p>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>First Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Alternate Contact First Name"
                  required
                  {...register("alternateFirstName", { required: true })}
                ></input>
              </div>
              <div className="col-md-6">
                <label>Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Alternate Contact Last Name"
                  required
                  {...register("alternateLastName", { required: true })}
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label>Phone Number</label>
                <input
                  name="phone"
                  className="form-control"
                  type="text"
                  placeholder="Alternate Contact Phone Number"
                  required
                  {...register("alternatePhone", { required: true })}
                ></input>
              </div>
              <div className="col-md-6">
                <label>Email</label>
                <input
                  name="email"
                  className="form-control"
                  type="email"
                  placeholder="Alternate Contact Email"
                  required
                  {...register("alternateEmail", { required: true })}
                ></input>
              </div>
            </div>
          </>
        )}

        <div className="my-3">
          <h3 className="text-primary">Questionnaire</h3>
          <p className="text-muted">
            In an effort to help the process go smoothly, please be as detailed
            as possible with your responses to the questions below.
          </p>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>What prompted you to adopt a pet?</label>
            <div className="mb-0">
              {source.map((option) => (
                <div key={option} className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={option}
                    {...register("source", { required: true })}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-12 col-sm-6">
            <label>Have you adopted pet before?</label>
            <div className="d-flex mb-0 btn-group">
              {yesOrNo.map((option) => (
                <div className="form-check mr-3 d-flex align-items-center mb-0">
                  <input
                    className="form-check-input mb-1"
                    type="radio"
                    value={option}
                    {...register("hadAdapted", { required: true })}
                  />
                  <label className="form-check-label" key={option}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-sm-3">
            <label>What type of building do you live in?</label>
            <div className="mb-0">
              {buildingTypes.map((option) => (
                <div key={option} className="form-check mb-3">
                  <input
                    className="form-check-input mb-1"
                    type="radio"
                    value={option}
                    {...register("buildingType")}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <label>Are you currently renting?</label>
            <div className="d-flex mb-0 btn-group">
              {yesOrNo.map((option) => (
                <div className="form-check mr-3 d-flex align-items-center mb-0">
                  <input
                    className="form-check-input mb-1"
                    type="radio"
                    value={option}
                    {...register("isRenting")}
                  />
                  <label className="form-check-label" key={option}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-3 form-check">
            <label>Who do you live with?</label>
            <div className="mb-0">
              {livingWith.map((option) => (
                <div key={option} className="form-check mb-3">
                  <input
                    className="form-check-input mb-1"
                    type="checkbox"
                    value={option}
                    {...register("livingWith")}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label>Are members of your household allergic to animals?</label>
            <div className="d-flex mb-0 btn-group">
              {yesOrNo.map((option) => (
                <div className="form-check mr-3 d-flex align-items-center mb-0">
                  <input
                    className="form-check-input mb-1"
                    type="radio"
                    value={option}
                    {...register("isAllergic")}
                  />
                  <label className="form-check-label" key={option}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {hasAllergies && (
          <>
            <div className="row">
              <div className="col-12">
                <label>
                  Even if members of your family have allergies, are you still
                  willing to adopt a pet?
                </label>
                <div className="d-flex mb-0 btn-group">
                  {["Yes", "No"].map((option) => (
                    <div
                      className="form-check mr-3 d-flex align-items-center mb-0"
                      key={option}
                    >
                      <input
                        className="form-check-input mb-1"
                        type="radio"
                        value={option}
                        {...register("willingToAllergies")}
                      />
                      <label className="form-check-label">{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="row">
          <div className="col-12">
            <label>
              Who will be responsible for feeding, grooming, and generally
              caring for your pet?
            </label>
            <input
              className="form-control"
              type="text"
              required
              {...register("responsibleFeeding")}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label>
              Who will be financially responsible for your pet’s needs (i.e.
              food, vet bills, etc.)?
            </label>
            <input
              className="form-control"
              type="text"
              required
              {...register("responsibleFinancial")}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label>
              Who will look after your pet if you go on vacation or in case of
              emergency?
            </label>
            <input
              className="form-control"
              type="text"
              required
              {...register("petSitter")}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label>
              How many hours in an average workday will your pet be left alone?
            </label>
            <input
              className="form-control"
              type="number"
              required
              min="1"
              max="24"
              {...register("awayHours")}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label>
              What steps will you take to introduce your new pet to his/her new
              surroundings?
            </label>
            <textarea
              className="form-control"
              type="text"
              required
              {...register("introduceSteps")}
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>
              Does everyone in the family support your decision to adopt a pet?
            </label>
            <div className="d-flex mb-0 btn-group">
              {yesOrNo.map((option) => (
                <div className="form-check mr-3 d-flex align-items-center mb-0">
                  <input
                    className="form-check-input mb-1"
                    type="radio"
                    value={option}
                    {...register("isFamilySupported")}
                  />
                  <label className="form-check-label" key={option}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <label>Do you have other pets?</label>
            <div className="d-flex mb-0 btn-group">
              {yesOrNo.map((option) => (
                <div className="form-check mr-3 d-flex align-items-center mb-0">
                  <input
                    className="form-check-input mb-1"
                    type="radio"
                    value={option}
                    {...register("haveOtherPets")}
                  />
                  <label className="form-check-label" key={option}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <h3 className="text-primary">House Inspection</h3>
        </div>

        <div>
          <p>
            Please attach photos of your home and place it under one .PDF file.
          </p>
          <p>Note:</p>

          <ol type="1">
            {houseInspectionItems.map((item, index) => (
              <li key={index} className="">
                {item}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <p className="text-warning">
            We value your privacy. Your photos will not be used for purposes
            other than this adoption application.
          </p>

          <div className="row">
            <div className="col-12">
              <input
                type="file"
                accept="application/pdf"
                className="form-control"
                required
                {...register("housePicture")}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <h3 className="text-primary">Interview & Visitation</h3>
          <p>(Minors must be accompanied by a parent or guardian.)</p>
        </div>
        <div className="mb-3">
          <small className=" text-warning">
            Note: We can't guarantee the availability of your requested time
          </small>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Preferred date for interview</label>
            <input
              type="date"
              className="form-control"
              required
              min={getTomorrowDate()}
              {...register("zoomDate", { required: true })}
            />
          </div>

          <div className="col-md-6">
            <label>Preferred time for interview</label>
            <div>
              <input
                type="number"
                placeholder="00"
                className="time"
                min="1"
                max="12"
                {...register("zoomTime", { required: true })}
              />
              <span className="mx-2">:</span>
              <input
                type="number"
                placeholder="00"
                className="time mr-2"
                min="0"
                max="59"
                {...register("zoomMinutes", { required: true })}
              />
              <select
                className="time"
                {...register("zoomMeridiem", { required: true })}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label>
              Will you be able to visit the shelter for the meet-and-greet?
            </label>
            <div className="d-flex mb-0 btn-group">
              {yesOrNo.map((option) => (
                <div className="form-check mr-3 d-flex align-items-center mb-0">
                  <input
                    className="form-check-input mb-1"
                    type="radio"
                    value={option}
                    {...register("willVisit", { required: true })}
                  />
                  <label className="form-check-label" key={option}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn rounded-pill pr-3 submit-btn">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default AdoptionForm;

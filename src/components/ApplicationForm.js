import OpenPaymentGateway from "../services/PaymentGateway";

const ApplicationForm = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card my-5 rounded-5 ">
            <div className="card-body">
              <h1 className="text-center">Adoption Form</h1>
              <hr className="w-100" />
              <div className="row">
                <div className="col-md-6 my-2">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="adress"
                    placeholder="Enter your Address"
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="number">Phone Number</label>
                  <input
                    type="number"
                    className="form-control "
                    id="number"
                    placeholder="Enter Phone"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="bday">Birth Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="bday"
                    placeholder="Enter your Birth Date"
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="flexRadioDefault" style={{ margin: "2px" }}>
                    Status
                  </label>
                  <div className="row">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Single
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          Married
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault3"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault3"
                        >
                          Others
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="occupation">Occupation</label>
                  <input
                    type="text"
                    className="form-control"
                    id="occupation"
                    placeholder="Please type N/A if unemployed"
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="socmed">Social Media</label>
                  <input
                    type="text"
                    className="form-control"
                    id="socmed"
                    placeholder="Please type N/A if no social media"
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="">What prompted you to adopt a pet</label>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault1"
                        >
                          Friends
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault2"
                        >
                          Social Media
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault3"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault3"
                        >
                          Website
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault4"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault4"
                        >
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="" style={{ margin: "2px" }}>
                    Have you adopted before
                  </label>
                  <div className="row">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault4"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault4"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault5"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault5"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="altCont">Alternate Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    id="altContFirstName"
                    placeholder="First Name"
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor=""></label>
                  <input
                    type="text"
                    className="form-control"
                    id="altContLastName"
                    placeholder="Last Name"
                  />
                </div>
                <div className="col-md-12">
                  <p>
                    If the applicant is a minor, a parent or a guardian must be
                    the alternate contact and co-sign the application.
                  </p>
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="altPhone">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="altPhone"
                    placeholder="Alternate Contact Phone Number"
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="altEmail">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="altEmail"
                    placeholder="Alternate Contact Email"
                  />
                </div>

                <h1 className="my-3">QUESTIONNAIRE</h1>

                <h3 className="my-1">
                  In an effort to help the process go smoothly, please be as
                  detailed as possible with your responses to the questions
                  below.
                </h3>

                <div className="col-md-12 my-2">
                  <label htmlFor="" style={{ margin: "2px" }}>
                    What are you looking to adopt
                  </label>
                  <div className="row">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault6"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault6"
                        >
                          Cat
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault7"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault7"
                        >
                          Dog
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault8"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault8"
                        >
                          Both
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault9"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault9"
                        >
                          Not Decided
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="" style={{ margin: "2px" }}>
                    Are you applying to adopt a specific shelter animal
                  </label>
                  <div className="row">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault10"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault10"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault11"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault11"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="description">
                    Describe your ideal pet, including its sex, age, appearance,
                    temperament, etc.
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="4"
                    placeholder=""
                  ></textarea>
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="" style={{ margin: "2px" }}>
                    What type of building do you live in?
                  </label>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault12"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault12"
                        >
                          House
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault13"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault13"
                        >
                          Condo
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault14"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault14"
                        >
                          Apartment
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault15"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault15"
                        >
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 my-2">
                  <label htmlFor="" style={{ margin: "2px" }}>
                    Do you rent
                  </label>
                  <div className="row">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault16"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault16"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault17"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault17"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="">Who do you live with</label>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault5"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault5"
                        >
                          Living alone
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault6"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault6"
                        >
                          Spouse
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault7"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault7"
                        >
                          Parents
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault8"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault8"
                        >
                          Children over 18
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault9"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault9"
                        >
                          Children below 18
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault10"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault10"
                        >
                          Relative
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault11"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault11"
                        >
                          Roomates
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="" style={{ margin: "2px" }}>
                    Are members of your hosehold allergic to animals
                  </label>
                  <div className="row">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault18"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault18"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault19"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault19"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="petFeed">
                    Who will be responsible for feeding, grooming, and generally
                    caring for your pet?
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="petFeed"
                    placeholder=""
                  />
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="petFinancially">
                    Who will be financially responsible for your pet’s needs
                    (i.e. food, vet bills, etc.)?
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="petFinancially"
                    placeholder=""
                  />
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="petEmergency">
                    Who will look after your pet if you go on vacation or in
                    case of emergency?
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="petEmergency"
                    placeholder=""
                  />
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="petAlone">
                    How many hours in an average workday will your pet be left
                    alone?
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="petAlone"
                    placeholder=""
                  />
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="steps">
                    What steps will you take to introduce your new pet to
                    his/her new surroundings?
                  </label>
                  <textarea
                    className="form-control"
                    id="steps"
                    rows="4"
                    placeholder=""
                  ></textarea>
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="" style={{ margin: "2px" }}>
                    Does everyone in the family support your decision to adopt a
                    pet?
                  </label>
                  <div className="row">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault20"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault20"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault21"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault21"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="explain">Please explain</label>
                  <textarea
                    className="form-control"
                    id="explain"
                    rows="4"
                    placeholder=""
                  ></textarea>
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="" style={{ margin: "2px" }}>
                    Do you have other pets?
                  </label>
                  <div className="row">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault22"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault22"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault23"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault23"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <label htmlFor="" style={{ margin: "2px" }}>
                    Does everyone in the family support your decision to adopt a
                    pet?
                  </label>
                  <div className="row">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault24"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault24"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault25"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault25"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <h5>
                    Please attach photos of your home. This has replaced our
                    on-site ocular inspections.
                  </h5>
                  <ol type="1">
                    <li>Front of the house</li>
                    <li>Street photo</li>
                    <li>Living room</li>
                    <li>Dining area</li>
                    <li>Kitchen</li>
                    <li>Bedroom/s (if you pet will have access)</li>
                    <li>Windows (if adopting a cat)</li>
                    <li>Front & backyard (if adopting a dog)</li>
                  </ol>
                  <h5>
                    We value your privacy. Your photos will not be used for
                    purposes other than this adoption application.
                  </h5>
                  <input
                    type="file"
                    className="form-control"
                    id=""
                    placeholder=""
                  />
                  <p>
                    <i>Max. file size: 256 MB.</i>
                  </p>
                </div>

                <h4>
                  Interview & Visitation (Minors must be accompanied by a parent
                  or guardian.)
                </h4>

                <div className="col-md-6 my-2">
                  <label htmlFor="zoom">
                    Preferred date for Zoom interview
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="zoom"
                    placeholder=""
                  />
                  <p>
                    <i>
                      We can't guarantee the availability of your requested time
                    </i>
                  </p>
                  <div className="col-md-12 my-2">
                    <label htmlFor="" style={{ margin: "2px" }}>
                      Will you be able to visit the shelter for the
                      meet-and-greet?
                    </label>
                    <div className="row">
                      <div className="col-auto">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault26"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault26"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault27"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault27"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 my-2">
                  <label htmlFor="">Preferred time for Zoom interview</label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder=""
                    />
                    <span className="input-group-text">:</span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder=""
                    />
                    <select className="form-select" id="time">
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <p>
                    <i>
                      We can't guarantee the availability of your requested time
                    </i>
                  </p>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <div>
                  <button
                    type="button"
                    className="btn rounded-pill my-2"
                    id="updateBtn"
                  >
                    Submit
                  </button>
                </div>

                <OpenPaymentGateway />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;

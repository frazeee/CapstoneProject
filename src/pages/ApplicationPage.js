import Navbar from "../components/Navbar";



const ApplicationPage = () => {


  return (
    <>
      <Navbar />
      <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card mt-5 rounded-5">
            <div className="card-body">
              <h1 className="text-center">Adoption Form</h1>
              <hr />
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
                {/* Repeat the same structure for other form inputs */}
              </div>
              <div className="col-md-6 my-2">
                <label style={{ margin: '2px' }}>Status</label>
                <div className="row">
                  <div className="col-auto">
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="status"
                        value="single"
                        
                      
                      />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Single
                      </label>
                    </div>
                  </div>
                  {/* Repeat for other radio buttons */}
                </div>
              </div>
              <div className="col-md-6 my-2">
                <label style={{ margin: '2px' }}>What prompted you to adopt a pet</label>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="friends"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault1">
                        Friends
                      </label>
                    </div>
                  </div>
                  {/* Repeat for other checkboxes */}
                </div>
              </div>
              <div className="col-md-6 my-2">
                <label style={{ margin: '2px' }}>Have you adopted before</label>
                <div className="row">
                  <div className="col-auto">
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="adoptedBefore"
                        value="yes"
                      />
                      <label className="form-check-label" htmlFor="flexRadioDefault4">
                        Yes
                      </label>
                    </div>
                  </div>
                  {/* Repeat for other radio buttons */}
                </div>
              </div>
              {/* Repeat the same structure for other form inputs */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ApplicationPage;

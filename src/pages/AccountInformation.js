import './AccountInformation.css'
import Navbar from '../components/Navbar';


const AccountInformation = () => {
    return(
        <>
        <Navbar />
       <div className='container-fluid'>
        <div className="row">
            <div className="col-xl-12">
                <div className="card mt-2 rounded-3 w-100">
                    <div className="card-body">
                        <h1 className="text-center">Account Information</h1>
                        <hr/>
                        <div className="row">
                            <div className="col-md-6 my-2">
                                <label for="firstName">First Name</label>
                                <input type="text" className="form-control" id="firstName"
                                    placeholder="Enter your first name" />
                            </div>
                            <div className="col-md-6 my-2">
                                <label for="lastName">Last Name</label>
                                <input type="text" className="form-control" id="lastName"
                                    placeholder="Enter your last name" />
                            </div>
                            <div className="col-md-6 my-2">
                                <label for="email">Email</label>
                                <input type="email" className="form-control" id="email"
                                    placeholder="Enter your email address" />
                            </div>
                            <div className="col-md-6 my-2">
                                <label for="number">Phone Number</label>
                                <input type="number" className="form-control " id="number" placeholder="Enter Phone"
                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                            </div>
                            <div className="col-12 my-2">
                                <label for="address">Address</label>
                                <textarea className="form-control " id="address" rows="5"
                                    placeholder="Enter your address"></textarea>
                            </div>
                        </div>
                        <button type="button" className="btn rounded-pill my-2" id="updateBtn">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default AccountInformation;
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { supabase } from "../components/client";
import "./PetPage.css";

const PetPage = ({ user }) => {
  const { cardId } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase
        .from("Pets")
        .select("*")
        .eq("id", cardId);
      if (error) {
        console.log("Error getting data:", error.message);
      } else {
        setData(data);
      }
    }
    getData();
  }, []);

  return (
    <div className="container-bg">
      <Navbar user={user} />
      <div className="container">
        {data.map((pet) => (
          <div className="pet-container">
            <div className="pet-header">
              <h1 key={pet.id}>{pet.pet_name}</h1>
              <img
                src={pet.image_url1}
                alt={pet.pet_name}
                className="img-fluid rounded"
              />
            </div>
            <div className="details-container">
              <div className="pet-details">
                <ul className="list-group list-group-flush pb-2 rounded">
                  <li className="list-group-item fs-5">
                    {" "}
                    <span className=" fw-bold">Age:</span> {pet.age} years old{" "}
                  </li>
                  <li className="list-group-item fs-5">
                    {" "}
                    <span className="fw-bold">Gender:</span> {pet.gender}{" "}
                  </li>
                  <li className="list-group-item fs-5">
                    {" "}
                    <span className="fw-bold">Personality:</span>{" "}
                    {pet.pet_personality}{" "}
                  </li>
                  <li className="list-group-item fs-6">
                    {" "}
                    <span className="fw-light text-body-secondary">
                      Note: All CPSS pets are both spayed and neutered
                    </span>{" "}
                  </li>
                </ul>
                <Link to={`/Application/${pet.id}`}>
                  {" "}
                  <button className="btn w-30">Apply Now</button>{" "}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PetPage;
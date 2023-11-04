import './PetPage.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { supabase } from "../components/client";
import { useEffect, useState } from "react";

const PetPage = ({user}) => {
    const { cardId } = useParams();

    const [data, setData] = useState([])

    useEffect(() => {
      async function getData() {
        const { data, error } = await supabase
        .from('Pets')
        .select('*')
        .eq('id', cardId)
        if (error) {
          console.log('Error getting data:', error.message)
        } else {
          setData(data)
        }
      }
      getData()
    }, [])

    return (
     <div>
        <Navbar user={user}/>
        <div className="container">
        {data.map((pet) => (
          <div className="row pt-3">
            <div className="col-lg-6"> 
                <img src={pet.image_url1} className="rounded w-80"/>
            </div>

            <div className="col-lg-6">
              <div className="fs-3">
                <h1 key={pet.id}>{pet.pet_name}</h1>
                <hr/>
                <p><span className="card-heading px-3">Age:</span> {pet.age} years old</p>
                <hr className='header-divider'/>
                <p><span className="card-heading px-3">Gender:</span>  {pet.gender}</p>
                <hr className='header-divider'/>
                <p><span className="card-heading px-3">Personality:</span> {pet.pet_personality}</p>
                <button className='btn text-nowrap w-100'>Apply Now</button>
              </div>
            </div>
          </div>
        ))}
           <h1 className='text-center'>ADOPTION FAQs HERE</h1>
         </div>

         
         <Footer />
    </div>
    )

}

export default PetPage;
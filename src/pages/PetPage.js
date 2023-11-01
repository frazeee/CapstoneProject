import Navbar from "../components/Navbar";
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
          console.log(data)
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
                <img src={pet.image_url1} className="rounded"/>
            </div>

            <div className="col-lg-6">
                <h1 key={pet.id}>{pet.pet_name}</h1>
                <hr/>
                <h1>Age: {pet.age}</h1>
                <h1>Gender:  {pet.gender}</h1>
                <h1>Personality: {pet.pet_personality}</h1>
            </div>

          </div>
        ))}
         </div>
    </div>
    )

}

export default PetPage;
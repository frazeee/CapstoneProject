import { useState } from "react";
import { supabase } from "./client";

const AddPetModal = () => {

    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

    const handleAddChange = (e) => {
        const { name, value } = e.target;
    
        // If the input is a file input, handle it differently
        if (e.target.type === 'file') {
          setFile(e.target.files[0]);
        } else {
          setAddFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
        console.log(addFormData)
      };

      const handleAddSubmit = async (e) => {
        e.preventDefault();
          try {

            if (!file) {
              alert('You must select an image to upload.')
            }
            
            const fileExt = file.name.split('.').pop()
            const fileName = `${addFormData.pet_name}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage.from('PetPictures').upload(filePath, file)

            if (uploadError) {
              throw uploadError
            }

            const { data: publicUrl, error: getUrlError } = await supabase.storage
            .from('PetPictures')
            .getPublicUrl(filePath)
    
          if (getUrlError) {
            throw getUrlError
          }

          setImageUrl(publicUrl)
          console.log(publicUrl.publicUrl)

          
          const { data, error } = await supabase
          .from('Pets')
          .insert([
            { pet_name: addFormData.pet_name, 
              age: addFormData.age,
              gender: addFormData.gender,
              pet_type: addFormData.petType,
              pet_personality: addFormData.pet_personality,
              image_url1: publicUrl.publicUrl},
          ])
          .select()

          if (error){
            throw error
          }
          else{
            alert("Pet added successfully!")
            document.getElementById("exampleModal").classList.remove("show");
          }

          } catch (error) {
            alert(error.message)
          }

          finally {
            setUploading(false)
          }
      
      };
      

        const [addFormData, setAddFormData] = useState({
        pet_name: '',
        age: '',
        gender: 'Male',
        petType: 'Dog',
        pet_personality: '',
      });
    



    return(
    <>
        <button type="button" className="btn btn-lg btn-dark px-5" data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-primary" id="exampleModalLabel">Add Pet</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="mb-3 px-2">
                    <label htmlFor="formFile" className="form-label">Add Pet Picture</label>
                    <input className="form-control" type="file" id="formFile" accept=".png, .jpg"  onChange={(e) => setFile(e.target.files[0])}/>
                </div>

                <div className="mb-3 px-2">
                              <label htmlFor="pet_name" className="form-label">
                                Pet Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="pet_name"
                                name="pet_name"
                                onChange={handleAddChange}
                                required
                              />
                            </div>

                            <div className="mb-3 px-2">
                              <label htmlFor="age" className="form-label">
                                Age
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="age"
                                name="age"
                                onChange={handleAddChange}
                                required
                              />
                            </div>

                            <div className="mb-3 px-2">
                            <label htmlFor="gender" className="form-label">
                                Gender
                              </label>
                                <select className="form-select" aria-label="Default select example" onChange={handleAddChange}>
                                    <option selected value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="mb-3 px-2">
                            <label htmlFor="petType" className="form-label">
                                Pet Type
                              </label>
                                <select className="form-select" aria-label="Default select example" onChange={handleAddChange}>
                                    <option selected value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                </select>
                            </div>

                            <div className="mb-3 px-2">
                              <label htmlFor="pet_personality" className="form-label">
                                Pet Personality
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="pet_personality"
                                name="pet_personality"
                                onChange={handleAddChange}
                                required
                              />
                            </div>


              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Add Pet</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>

    )
}

export default AddPetModal;
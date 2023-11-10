import { useState } from "react";
import { supabase } from "./client";

const DeleteModal = () => {

    

    return(
    <>
    
    <button type="button" className="btn danger-btn w-100 mt-2" onClick={() => handleClick(cardItem)}>Delete Pet</button>
        <div>
            <div
              className="modal-backdrop show"
              style={{ zIndex: 1040 }}
              onClick={closeDeleteModal}
            ></div>

            <div
              className="modal fade show"
              style={{ display: 'block' }}
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5">Delete Pet</h1>
                    <button className="btn-close" onClick={closeDeleteModal} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                        Are you sure you want to delete <span className="fw-bold"> {selectedCard.pet_name}</span> ?

                      </div>
                      <div className="modal-footer">
                        <button className="btn btn-lg danger-btn" onClick={DeletePet}>Delete Pet</button>
                        <button className="btn btn-lg " onClick={closeDeleteModal}>Close</button>
                      </div>
                  </div>
              
                </div>
              </div>
            </div>
      </>

    )
}

export default DeleteModal;
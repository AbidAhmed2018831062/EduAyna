import React from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "@/redux/features/students/studentsSlice";
import showToast from "@/app/showToast";

function DeleteModal({id,setDeleteUserModal}) {
     const dispatch=useDispatch();
     const loading = useSelector(
    (state) => state.students.deleteLoading
  );
     const sureDelete=async()=>{
         try {
        const data=await dispatch(deleteStudent(id)).unwrap()
       if(data?.error){
        showToast("error",data?.error||data?.error?.message)
        return;
       }
        showToast("success","Student Delete Successfully")
        setDeleteUserModal(false);
      } catch (error) {
         showToast("error",error?.message||"Failed to Delete student")
        console.error(error);
      }
    
     }
  return (
    <Modal setOpen={setDeleteUserModal}>
          <div class="relative text-center bg-white rounded-lg ">
            <button
             onClick={()=>setDeleteUserModal(false)}
              type="button"
              class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent "
              data-modal-toggle="deleteModal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <svg
              class="text-gray-400 w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <p class="mb-4 text-black ">
              Are you sure you want to delete this item?
            </p>
            <div class="flex justify-center items-center space-x-4">
              <button
                data-modal-toggle="deleteModal"
                type="button"
                onClick={()=>setDeleteUserModal(false)}
                class="py-2 px-3 text-sm font-medium text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 "
              >
                No, cancel
              </button>
              <button
                type="submit"
                onClick={sureDelete}
                class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 "
              >
               {loading?"Deleting...":"Yes, sure"}
              </button>
            </div>
          </div>
      
    </Modal>
  );
}

export default DeleteModal;

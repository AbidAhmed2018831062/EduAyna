import React, { useState } from 'react';
import AddStudentModal from '../Modals/AddStudentModal';

function AddStudent(props) {
    const [addStudentModal,setAddStudentModal]=useState(false);
    const openAddStudentModal=()=>{
       setAddStudentModal(!addStudentModal);
    }
    return (
        <>
        <div>
          <button className="bg-[#0a7aff] text-sm px-3 py-2 text-white rounded-sm" onClick={openAddStudentModal}><span className="text-md" >+</span> Add Student</button>
        </div>
        {addStudentModal&&<AddStudentModal setAddStudentModal={setAddStudentModal}/>}
        </>
    );
}

export default AddStudent;
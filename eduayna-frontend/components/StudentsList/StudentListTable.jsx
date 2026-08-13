import React, { useState } from 'react';
import DeleteModal from '../Modals/DeleteModal';
import AddStudentModal from '../Modals/AddStudentModal';

function StudentListTable({students}) {
  const [deleteUserModal,setDeleteUserModal]=useState(false)
  const [currentStudent,setCurrentStudent]=useState(null)
  const [editModal,setEditModal]=useState(false)
  const deleteUser=(student)=>{
setDeleteUserModal(!deleteUserModal)
setCurrentStudent(student)
  }
  const editUser=(student)=>{
    setEditModal(true);
    setCurrentStudent(student)

  }
    return (
   <table className="w-full text-left text-sm">
  <thead className="border-b border-gray-200 bg-gray-50">
    <tr>
      <th className="px-6 py-3">Student</th>
      <th className="px-6 py-3">Email</th>
      <th className="px-6 py-3">Phone</th>
      <th className="px-6 py-3">Class</th>
      <th className="px-6 py-3">Status</th>
      <th className="px-6 py-3">Actions</th>
    </tr>
  </thead>

  <tbody>
    {students?.map((student) => (
      <tr
        key={student?.id}
        className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
      >
        <td className="px-6 py-4 font-medium text-gray-900">
          {student?.name}
        </td>

        <td className="px-6 py-4 text-gray-600">
          {student?.email}
        </td>

        <td className="px-6 py-4 text-gray-600">
          {student?.phone}
        </td>

        <td className="px-6 py-4 text-gray-600">
          {student?.class}
        </td>

        <td className="px-6 py-4">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
              student?.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {student?.status}
          </span>
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={()=>editUser(student)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={()=>deleteUser(student)}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))}
    {deleteUserModal&&<DeleteModal id={currentStudent?.id} setDeleteUserModal={setDeleteUserModal}/>}
    {editModal&&<AddStudentModal student={currentStudent} setAddStudentModal={setEditModal}/>}
  </tbody>
</table>
    );
}

export default StudentListTable;
import React, { useState } from "react";
import DeleteModal from "../Modals/DeleteModal";
import AddStudentModal from "../Modals/AddStudentModal";
import { useSelector } from "react-redux";
import Link from "next/link";

function StudentListTable() {
  const { students, search } = useSelector((state) => state.students);
const [sortField, setSortField] = useState("name");
const [sortOrder, setSortOrder] = useState("asc");
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const deleteUser = (student) => {
    setDeleteUserModal(!deleteUserModal);
    setCurrentStudent(student);
  };
  const editUser = (student) => {
    setEditModal(true);
    setCurrentStudent(student);
  };

  const selectedClasses = useSelector(
    (state) => state.students.selectedClasses,
  );

  const selectedStatuses = useSelector(
    (state) => state.students.selectedStatuses,
  );

  const filteredStudents = students.filter((student) => {
    const searchValue = search.trim().toLowerCase();

    const matchesSearch =
      !searchValue ||
      student.name?.toLowerCase().includes(searchValue) ||
      student.email?.toLowerCase().includes(searchValue);

    const matchesClass =
      selectedClasses.length === 0 || selectedClasses.includes(student.class);

    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(student.status);

    return matchesSearch && matchesClass && matchesStatus;
  
  });
  const handleSort=(sortBy)=>{
     setSortField(sortBy)
      setSortOrder((prev) =>
      prev === "asc" ? "desc" : "asc"
    );
} 
  const sortedStudents = [...filteredStudents].sort((a, b) =>
  sortOrder==="asc"?a[sortField]?.localeCompare(b[sortField]):
  b[sortField]?.localeCompare(a[sortField])
);

  return (
    <table className="w-full text-left text-sm min-h-[300px]">
      <thead className="border-b border-gray-200 bg-gray-50">
        <tr>
          <th className="px-6 py-3">
            <button
              type="button"
              onClick={() => handleSort("name")}
              className="flex items-center gap-1.5 font-medium hover:text-gray-900"
            >
              Student
              <span className="flex flex-col">
                <svg
                  className={`h-2.5 w-2.5 ${
                    sortField === "name" && sortOrder === "asc"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                  viewBox="0 0 10 6"
                  fill="currentColor"
                >
                  <path d="M5 0 10 6H0L5 0Z" />
                </svg>

                <svg
                  className={`h-2.5 w-2.5 ${
                    sortField === "name" && sortOrder === "desc"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                  viewBox="0 0 10 6"
                  fill="currentColor"
                >
                  <path d="M5 6 0 0h10L5 6Z" />
                </svg>
              </span>
            </button>
          </th>
          <th className="px-6 py-3">Email</th>
          <th className="px-6 py-3">Phone</th>
          <th className="px-6 py-3">
            <button
              type="button"
              onClick={() => handleSort("class")}
              className="flex items-center gap-1.5 font-medium hover:text-gray-900"
            >
              Class
              <span className="flex flex-col">
                <svg
                  className={`h-2.5 w-2.5 ${
                    sortField === "class" && sortOrder === "asc"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                  viewBox="0 0 10 6"
                  fill="currentColor"
                >
                  <path d="M5 0 10 6H0L5 0Z" />
                </svg>

                <svg
                  className={`h-2.5 w-2.5 ${
                    sortField === "class" && sortOrder === "desc"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                  viewBox="0 0 10 6"
                  fill="currentColor"
                >
                  <path d="M5 6 0 0h10L5 6Z" />
                </svg>
              </span>
            </button>
          </th>
          <th className="px-6 py-3">Status</th>
          <th className="px-6 py-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {sortedStudents?.map((student) => (
        
          <tr
            key={student?.id}
            className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
          >
            <td className="px-6 py-4 font-medium text-gray-900">
              {student?.name}
            </td>

            <td className="px-6 py-4 text-gray-600">{student?.email}</td>

            <td className="px-6 py-4 text-gray-600">{student?.phone}</td>

            <td className="px-6 py-4 text-gray-600">{student?.class}</td>

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
                  onClick={() => editUser(student)}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteUser(student)}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
                  <Link href={`/students/${student?.id}`}>View </Link>
              </div>
            </td>
          </tr>
           
        ))}
        {deleteUserModal && (
          <DeleteModal
            id={currentStudent?.id}
            setDeleteUserModal={setDeleteUserModal}
          />
        )}
        {editModal && (
          <AddStudentModal
            student={currentStudent}
            setAddStudentModal={setEditModal}
          />
        )}
      </tbody>
    </table>
  );
}

export default StudentListTable;

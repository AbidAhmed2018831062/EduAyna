import React, { useState } from "react";
import DeleteModal from "../Modals/DeleteModal";
import AddStudentModal from "../Modals/AddStudentModal";
import { useSelector } from "react-redux";
import Link from "next/link";
import SortIcon from "../HelperComponents/SortIcon";
import StatusBadge from "../HelperComponents/StatusBadge";




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

  const handleSort = (sortBy) => {
    if (sortBy === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(sortBy);
      setSortOrder("asc");
    }
  };

  const sortedStudents = [...filteredStudents].sort((a, b) =>
    sortOrder === "asc"
      ? a[sortField]?.localeCompare(b[sortField])
      : b[sortField]?.localeCompare(a[sortField]),
  );

  return (
    <>
      {/* Desktop / tablet table view */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm min-h-[300px]">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 lg:px-6 py-3 whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1.5 font-medium hover:text-gray-900"
                >
                  Student
                  <SortIcon active={sortField === "name"} direction={sortOrder} />
                </button>
              </th>
              <th className="px-4 lg:px-6 py-3 whitespace-nowrap">Email</th>
              <th className="hidden lg:table-cell px-4 lg:px-6 py-3 whitespace-nowrap">
                Phone
              </th>
              <th className="px-4 lg:px-6 py-3 whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => handleSort("class")}
                  className="flex items-center gap-1.5 font-medium hover:text-gray-900"
                >
                  Class
                  <SortIcon active={sortField === "class"} direction={sortOrder} />
                </button>
              </th>
              <th className="px-4 lg:px-6 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 lg:px-6 py-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedStudents?.map((student) => (
              <tr
                key={student?.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
              >
                <td className="px-4 lg:px-6 py-4 font-medium text-gray-900">
                  {student?.name}
                </td>
                <td className="px-4 lg:px-6 py-4 text-gray-600 break-all">
                  {student?.email}
                </td>
                <td className="hidden lg:table-cell px-4 lg:px-6 py-4 text-gray-600 whitespace-nowrap">
                  {student?.phone}
                </td>
                <td className="px-4 lg:px-6 py-4 text-gray-600 whitespace-nowrap">
                  {student?.class}
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <StatusBadge status={student?.status} />
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex flex-wrap items-center gap-2">
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
                    <Link
                      href={`/students/${student?.id}`}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden w-full min-h-[300px]">
        {/* Sort controls, since there's no header row on mobile */}
        <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600">
          <span>Sort by:</span>
          <button
            type="button"
            onClick={() => handleSort("name")}
            className={`flex items-center gap-1 ${
              sortField === "name" ? "text-blue-600" : ""
            }`}
          >
            Name
            <SortIcon active={sortField === "name"} direction={sortOrder} />
          </button>
          <button
            type="button"
            onClick={() => handleSort("class")}
            className={`flex items-center gap-1 ${
              sortField === "class" ? "text-blue-600" : ""
            }`}
          >
            Class
            <SortIcon active={sortField === "class"} direction={sortOrder} />
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {sortedStudents?.map((student) => (
            <div key={student?.id} className="px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-900">
                    {student?.name}
                  </p>
                  <p className="truncate text-sm text-gray-600">
                    {student?.email}
                  </p>
                </div>
                <StatusBadge status={student?.status} />
              </div>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                {student?.phone && <span>{student.phone}</span>}
                {student?.class && <span>Class: {student.class}</span>}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => editUser(student)}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteUser(student)}
                  className="flex-1 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
                <Link
                  href={`/students/${student?.id}`}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

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
    </>
  );
}

export default StudentListTable;
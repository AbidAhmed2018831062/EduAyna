import React from "react";
import StudentSearch from "../HelperComponents/StudentSearch";
import FilterStudents from "./FilterStudents";
import AddStudent from "./AddStudent";


function StudentsHeader() {
  return (
    <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
      <div className="w-full sm:max-w-96">
        <StudentSearch />
      </div>

      <div className="flex items-center gap-2 sm:shrink-0">
        <FilterStudents />
        <AddStudent />
      </div>
    </div>
  );
}

export default StudentsHeader;
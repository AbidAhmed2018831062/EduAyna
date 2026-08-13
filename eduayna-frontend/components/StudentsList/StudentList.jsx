"use client";
import React, { useEffect, useRef, useState } from "react";
import FilterDropdown from "../HelperComponents/FilterDropdown";
import demoStudentList from "@/utils/demoStudentList";
import StudentSort from "../HelperComponents/StudentSort";
import { useDispatch, useSelector } from "react-redux";
import { fetchstudents } from "@/redux/features/students/studentsSlice";
import AddStudent from "./AddStudent";
import StudentListLoading from "../Loading/StudentListLoading";
import showToast from "@/app/showToast";
import StudentListTable from "./StudentListTable";
import FilterStudents from "./FilterStudents";

function StudentList(props) {

   const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
 const loading = useSelector(
      (state) => state.students.loading
  );
  const error = useSelector(
      (state) => state.students.error
  );
  if(error)
    showToast("error",error?.message||"Failed to fetch students")
  useEffect(() => {
    dispatch(fetchstudents());
  }, [dispatch]);
  return (
    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <div class="p-4 flex items-center justify-between space-x-4">
        <StudentSort/>
        <div className="flex items-center gap-3">
       <FilterStudents/>
        <AddStudent/>
        </div>
      </div>
      {!loading?<StudentListTable students={students}/>
      :
      <StudentListLoading/>}
      
    </div>
  );
}

export default StudentList;

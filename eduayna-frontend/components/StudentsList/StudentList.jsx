"use client";
import React, { useEffect, useRef, useState } from "react";
import StudentSearch from "../HelperComponents/StudentSearch";
import { useDispatch, useSelector } from "react-redux";
import { fetchstudents } from "@/redux/features/students/studentsSlice";
import AddStudent from "./AddStudent";
import StudentListLoading from "../Loading/StudentListLoading";
import showToast from "@/app/showToast";
import StudentListTable from "./StudentListTable";
import FilterStudents from "./FilterStudents";
import StudentsHeader from "./StudentsHeader";

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
      <StudentsHeader/>
      {!loading?<StudentListTable students={students}/>
      :
      <StudentListLoading/>}
      
    </div>
  );
}

export default StudentList;

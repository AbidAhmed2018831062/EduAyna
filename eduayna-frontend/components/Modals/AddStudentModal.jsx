"use client";

import React from "react";
import { useFormik } from "formik";
import Modal from "./Modal";
import { addStudentSchema } from "@/validation/schema.js";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "@/redux/features/students/studentsSlice";
import showToast from "@/app/showToast";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  class: "",
  status: "active",
};

function AddStudentModal({ setAddStudentModal }) {
   const addLoading = useSelector(
    (state) => state.students.addLoading
  );

  const addError = useSelector(
    (state) => state.students.addError
  );

  const dispatch=useDispatch();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: addStudentSchema,

    onSubmit: async (values) => {
      try {
        const data=await dispatch(addStudent(values)).unwrap()
        resetForm();
       if(data?.error){
        showToast("error",data?.error||data?.error?.message)
        return;
       }
        showToast("success","Student Addedd Successfully")
        setAddStudentModal(false);
      } catch (error) {
         showToast("error",error?.message||"Failed to add student")
        console.error(error);
      }
    },
  });

  const inputClass =
    "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <Modal setOpen={setAddStudentModal} maxWidth="max-w-lg">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-900">
          Add Student
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Enter the student information below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Name
          </label>

          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            className={inputClass}
          />

          {touched.name && errors.name && (
            <p className={errorClass}>{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@example.com"
            className={inputClass}
          />

          {touched.email && errors.email && (
            <p className={errorClass}>{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Phone
          </label>

          <input
            type="text"
            name="phone"
            id="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+1 202 555 0101"
            className={inputClass}
          />

          {touched.phone && errors.phone && (
            <p className={errorClass}>{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="class"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Class
          </label>

          <input
            type="text"
            name="class"
            id="class"
            value={values.class}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="10A"
            className={inputClass}
          />

          {touched.class && errors.class && (
            <p className={errorClass}>{errors.class}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            name="status"
            id="status"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {touched.status && errors.status && (
            <p className={errorClass}>{errors.status}</p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={() => setAddStudentModal(false)}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
           {addLoading?"Adding...":"Add Student"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddStudentModal;
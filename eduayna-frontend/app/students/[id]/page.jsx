"use client";
import showToast from "@/app/showToast";
import UserProfileSkeleton from "@/components/Loading/UserSkeleton";
import AddStudentModal from "@/components/Modals/AddStudentModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function Page() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const deleteUser = () => {
    setDeleteUserModal(true);
  };

  const editUser = () => {
    setEditModal(true);
  };

  useEffect(() => {
    const getStudent = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/students/${id}`
        );
        const data = await response.json();
        
        if (!response.ok || data?.error) {
          showToast("error", data?.message || "Failed to fetch student");
        } else {
          setStudent(data?.student);
        }
      } catch (err) {
        showToast("error", "Failed to fetch student details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getStudent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <UserProfileSkeleton />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500 mb-4">Student not found or unavailable.</p>
        <Link
          href="/students"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Back to Students List
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto my-6 w-full max-w-4xl px-4 md:px-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Students
        </Link>
        <span className="text-xs font-mono text-gray-400">ID: {student?.id}</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-32 w-full bg-gradient-to-r from-blue-600 to-indigo-700" />

        <div className="px-6 pb-6 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 sm:-mt-16 mb-6 gap-4">
            <div className="flex items-end gap-4">
              <div className="relative flex h-24 w-24 sm:h-32 sm:w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-50 font-bold text-blue-600 text-2xl shadow-md">
                {student?.name ? (
                  student.name.slice(0, 2).toUpperCase()
                ) : (
                  <svg
                    className="w-16 h-16 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{student?.name}</h1>
                <p className="text-sm text-gray-500">{student?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={editUser}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={deleteUser}
                className="rounded-lg border border-red-200 bg-red-50/50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 pb-6 mb-6">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                student?.status === "active"
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                  : "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  student?.status === "active" ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
              {student?.status || "Unknown status"}
            </span>

            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              Class: {student?.class || "Unassigned"}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Contact & Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4 border border-gray-100">
              <div>
                <span className="block text-xs font-medium text-gray-400">Email Address</span>
                <span className="text-sm font-medium text-gray-800">{student?.email || "—"}</span>
              </div>
              <div>
                <span className="block text-xs font-medium text-gray-400">Phone Number</span>
                <span className="text-sm font-medium text-gray-800">{student?.phone || "—"}</span>
              </div>
              <div>
                <span className="block text-xs font-medium text-gray-400">Enrolled Class</span>
                <span className="text-sm font-medium text-gray-800">{student?.class || "—"}</span>
              </div>
              <div>
                <span className="block text-xs font-medium text-gray-400">Account Status</span>
                <span className="text-sm font-medium text-gray-800 capitalize">{student?.status || "—"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {deleteUserModal && (
        <DeleteModal
          id={student?.id}
          setDeleteUserModal={setDeleteUserModal}
        />
      )}
      {editModal && (
        <AddStudentModal
          student={student}
          setAddStudentModal={setEditModal}
        />
      )}
    </div>
  );
}

export default Page;
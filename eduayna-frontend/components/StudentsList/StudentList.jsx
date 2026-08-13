"use client";
import React, { useEffect, useRef, useState } from "react";
import FilterDropdown from "../HelperComponents/FilterDropdown";
import demoStudentList from "@/utils/demoStudentList";
import StudentSort from "../HelperComponents/StudentSort";

function StudentList(props) {
  const [openFilter, setOpenFilter] = useState(false);
  const filterRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <div class="p-4 flex items-center justify-between space-x-4">
        <StudentSort/>
        <div class="relative inline-block">
          <button
            onClick={() => setOpenFilter(true)}
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            class="w-32 shrink-0 inline-flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2"
            type="button"
          >
            <svg
              class="w-4 h-4 me-1.5 -ms-0.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
              />
            </svg>
            Filter by
            <svg
              class="w-4 h-4 ms-1.5 -me-0.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          </button>
          {openFilter && <FilterDropdown ref={filterRef} />}
        </div>
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-t border-default-medium">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="table-checkbox-20"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                />
                <label for="table-checkbox-20" class="sr-only">
                  Table checkbox
                </label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Name
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Email
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Phone
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Class
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Status
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {demoStudentList?.map((e) => (
            <tr
              key={e?.id}
              class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
            >
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    id="table-checkbox-21"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                  />
                  <label for="table-checkbox-21" class="sr-only">
                    Table checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {e?.name}
              </th>
              <td class="px-6 py-4">{e?.email}</td>
              <td class="px-6 py-4">{e?.phone}</td>
              <td class="px-6 py-4">{e?.class}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    e?.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {e?.status}
                </span>
              </td>
              <td class="px-6 py-4">
                <a href="#" class="font-medium text-fg-brand hover:underline">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;

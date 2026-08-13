"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleClassFilter,
  toggleStatusFilter,
  clearFilters,
} from "@/redux/features/students/studentsSlice";

function FilterDropdown({ ref }) {
  const dispatch = useDispatch();

  const students = useSelector(
    (state) => state.students.students
  );

  const selectedClasses = useSelector(
    (state) => state.students.selectedClasses
  );

  const selectedStatuses = useSelector(
    (state) => state.students.selectedStatuses
  );

  const classes = [
    ...new Set(
      students
        .map((student) => student?.class)
        .filter(Boolean)
    ),
  ];

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg"
    >
      <div className="p-3">
        <div className="mb-4">
          <p className="mb-2 text-sm font-semibold text-gray-900">
            Status
          </p>

          <div className="space-y-2">
            {["active", "inactive"].map((status) => (
              <label
                key={status}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={() =>
                    dispatch(toggleStatusFilter(status))
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />

                <span className="capitalize">
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <p className="mb-2 text-sm font-semibold text-gray-900">
            Class
          </p>

          <div className="max-h-40 space-y-2 overflow-y-auto">
            {classes.map((className) => (
              <label
                key={className}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedClasses.includes(className)}
                  onChange={() =>
                    dispatch(toggleClassFilter(className))
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />

                <span>{className}</span>
              </label>
            ))}
          </div>
        </div>

        {(selectedClasses.length > 0 ||
          selectedStatuses.length > 0) && (
          <button
            type="button"
            onClick={() => dispatch(clearFilters())}
            className="mt-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterDropdown;
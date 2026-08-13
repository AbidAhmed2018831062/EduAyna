import React from "react";

function StudentListLoading() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-4 border-b border-gray-200 p-4">
        <div className="h-10 w-full max-w-sm animate-pulse rounded-lg bg-gray-200" />

        <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
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
            {[1, 2, 3, 4, 5].map((item) => (
              <tr
                key={item}
                className="border-b border-gray-100 last:border-0"
              >

                <td className="px-6 py-4">
                  <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-6 py-4">
                  <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-6 py-4">
                  <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-6 py-4">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <div className="h-8 w-14 animate-pulse rounded-lg bg-gray-200" />
                    <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-200" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentListLoading;
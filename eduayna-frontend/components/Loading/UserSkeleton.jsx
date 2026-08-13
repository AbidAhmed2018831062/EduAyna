import React from "react";

export default function UserProfileSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading user profile..."
      className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse"
    >
      <div className="h-36 sm:h-52 w-full bg-gray-200" />

      <div className="px-4 pb-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-14 sm:-mt-20 mb-6 gap-4">
          <div className="h-24 w-24 sm:h-36 sm:w-36 rounded-full border-4 border-white bg-gray-300 shrink-0 shadow-sm" />

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="h-9 w-24 rounded-lg bg-gray-200" />
            <div className="h-9 w-28 rounded-lg bg-gray-300" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-7 w-48 sm:w-64 rounded-md bg-gray-300" />
            <div className="h-5 w-16 rounded-full bg-gray-200" />
          </div>
          <div className="h-4 w-32 rounded bg-gray-200" />
        </div>

        <div className="mt-4 space-y-2 max-w-2xl">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-4/5 rounded bg-gray-200" />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-b border-gray-100 py-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-28 rounded bg-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-200" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
          {[1, 2, 3].map((item) => (
            <div key={item} className="space-y-1.5">
              <div className="h-6 w-12 rounded bg-gray-300" />
              <div className="h-3 w-16 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex border-t border-gray-200 px-4 sm:px-8 bg-gray-50/50">
        {[1, 2, 3, 4].map((tab) => (
          <div key={tab} className="py-4 px-3 sm:px-6">
            <div className="h-4 w-16 sm:w-20 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <span className="sr-only">Loading user profile...</span>
    </div>
  );
}
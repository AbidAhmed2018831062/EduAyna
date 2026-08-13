import useDebounce from '@/hooks/useDebounce';
import { setSearch } from '@/redux/features/students/studentsSlice';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function StudentSearch(props) {
const dispatch = useDispatch();
const {debounce}=useDebounce()
 const handleSearch = useMemo(
  () =>
    debounce((value) => {
      dispatch(setSearch(value));
    }, 500),
  [debounce, dispatch]
);

  const handleChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    handleSearch(value);
  };
  
    return (
          <>
        <label htmlFor="input-group-1" class="sr-only">
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-body"
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
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="input-group-1"
            class="block w-full max-w-96 ps-9 pe-3 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            placeholder="Search"
            onChange={handleChange}
          />
        </div>
        </>
    );
}

export default StudentSearch;
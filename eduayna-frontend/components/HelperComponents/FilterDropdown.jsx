import studentFilterList from "@/utils/filterList";
import React from "react";

function FilterDropdown({ref}) {
  return (
    <div
      id="dropdown"
      class="z-10 bg-white border border-default-medium rounded-base shadow-lg w-32   absolute"
      ref={ref}
    >
      <ul
        class="p-2 text-sm text-body font-medium"
        aria-labelledby="dropdownDefaultButton"
      >
        {studentFilterList.map((filter) => (
          <li key={filter}>
              <a
                href="#"
                class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
              >
                {filter}
              </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterDropdown;

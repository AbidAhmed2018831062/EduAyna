function SortIcon({ active, direction }) {
  return (
    <span className="flex flex-col">
      <svg
        className={`h-2.5 w-2.5 ${
          active && direction === "asc" ? "text-blue-600" : "text-gray-400"
        }`}
        viewBox="0 0 10 6"
        fill="currentColor"
      >
        <path d="M5 0 10 6H0L5 0Z" />
      </svg>
      <svg
        className={`h-2.5 w-2.5 ${
          active && direction === "desc" ? "text-blue-600" : "text-gray-400"
        }`}
        viewBox="0 0 10 6"
        fill="currentColor"
      >
        <path d="M5 6 0 0h10L5 6Z" />
      </svg>
    </span>
  );
}
export default SortIcon
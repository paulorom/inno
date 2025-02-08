// components/SearchFilters.js
import { useState } from "react";

const SearchFilters = ({ query, setQuery, selectedDaysAgo, setSelectedDaysAgo }) => {
  const [rangeValue, setRangeValue] = useState(selectedDaysAgo);

  const handleRangeChange = (event) => {
    const daysAgo = parseInt(event.target.value, 10);
    setRangeValue(daysAgo);
    setSelectedDaysAgo(daysAgo);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-5 p-4 bg-gray-900 rounded-lg">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="p-2 rounded-lg bg-gray-800 text-white w-full md:w-1/3"
      />

      {/* Date Range Filter */}
      <div className="flex flex-col items-center md:items-start mt-3 md:mt-0">
        <label className="text-gray-400 text-sm">Filter by Last {rangeValue} Days</label>
        <input
          type="range"
          min="1"
          max="365"
          value={rangeValue}
          onChange={handleRangeChange}
          className="w-full md:w-48"
        />
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          setQuery("");
          setSelectedDaysAgo(30);
          setRangeValue(30);
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-lg mt-3 md:mt-0"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SearchFilters;

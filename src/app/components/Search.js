import { useState } from "react";

const Search = ({ setQuery, setSelectedPubDate, setShowSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    setQuery(searchTerm);
    setShowSearch(false);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-5 z-50">
      <div className="bg-gray-800 p-5 rounded-lg w-full max-w-lg">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white mb-3"
        />
        <input
          type="date"
          value={beginDate}
          onChange={(e) => setBeginDate(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white mb-3"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white"
        />
        <button
          className="mt-3 w-full bg-red-600 text-white p-3 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="mt-3 w-full bg-gray-600 text-white p-3 rounded"
          onClick={() => setShowSearch(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Search;

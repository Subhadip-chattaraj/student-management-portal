import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../css/SearchBar.css";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  filterClass,
  setFilterClass,
  availableClasses,
}) => {
  const navigate = useNavigate();

  return (
    <div className="search-bar">
      <div className="left-actions">
        <button onClick={() => navigate("/add-student")}>
          <IoIosPersonAdd />
        </button>
      </div>
      <div className="right-actions">
        {/* 🔍 Search by name, roll no, etc. */}
        <input
          type="text"
          placeholder="Search by name, roll no..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button><FaSearch /></button>

        {/* 🎓 Dynamic Filter by class */}
        <FaFilter className="filter-icon" />
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {availableClasses.map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;

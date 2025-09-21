import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import UpdateStudent from "./components/UpdateStudent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [availableClasses, setAvailableClasses] = useState([]); // 🔥 new

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filterClass={filterClass}
                  setFilterClass={setFilterClass}
                  availableClasses={availableClasses} // 🔥 pass to SearchBar
                />
                <StudentList
                  searchQuery={searchQuery}
                  filterClass={filterClass}
                  setAvailableClasses={setAvailableClasses} // 🔥 StudentList sets it
                />
              </>
            }
          />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

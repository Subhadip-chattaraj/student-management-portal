import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaListOl,
  FaChalkboardTeacher,
  FaBirthdayCake,
  FaHome,
  FaPhone,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/StudentList.css";

const StudentList = ({ searchQuery, filterClass,setAvailableClasses }) => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8081/students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        toast.error("❌ Failed to load students.");
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8081/students");
      const data = await response.json();
      setStudents(data);

      // 🔥 Extract unique classes
      const classes = [...new Set(data.map((s) => s.study_class))].sort(
        (a, b) => a - b
      );
      setAvailableClasses(classes);
    } catch (error) {
      console.error("Error fetching student data:", error);
      toast.error("❌ Failed to load students.");
    }
  };

  fetchStudents();
}, [setAvailableClasses]);

  // ✅ Delete handler
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await fetch(`http://localhost:8081/student/delete/${id}`, {
          method: "DELETE",
        });
        setStudents((prev) => prev.filter((student) => student.studentID !== id));
        toast.success(`🗑️ ${name} deleted successfully!`);
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("❌ Failed to delete student.");
      }
    }
  };

  // 🔎 Apply search + filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roll_no.toString().includes(searchQuery);

    const matchesFilter =
      filterClass === "" || student.study_class.toString() === filterClass;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="student-container">
      <h2 className="student-title">📚 Student List</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th><FaUser className="icon" /> Name</th>
            <th><FaListOl className="icon" /> Roll No</th>
            <th><FaChalkboardTeacher className="icon" /> Class</th>
            <th><FaBirthdayCake className="icon" /> Age</th>
            <th><FaHome className="icon" /> Address</th>
            <th><FaPhone className="icon" /> Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {filteredStudents.length === 0 ? (
              <motion.tr
                key="no-data"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <td colSpan="7" className="no-data">
                  No students found.
                </td>
              </motion.tr>
            ) : (
              filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.roll_no || student.studentID}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <td>{student.name}</td>
                  <td>{student.roll_no}</td>
                  <td>{student.study_class}</td>
                  <td>{student.age}</td>
                  <td>{student.address}</td>
                  <td>{student.phone_no}</td>
                  <td className="action-buttons">
                    <FaEdit
                      className="action-icon edit"
                      title="Edit"
                      onClick={() => navigate(`/update/${student.studentID}`)}
                    />
                    <FaTrash
                      className="action-icon delete"
                      title="Delete"
                      onClick={() =>
                        handleDelete(student.studentID, student.name)
                      }
                    />
                  </td>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default StudentList;

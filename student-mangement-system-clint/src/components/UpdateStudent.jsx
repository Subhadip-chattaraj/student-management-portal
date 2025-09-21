import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  FaUser,
  FaListOl,
  FaChalkboardTeacher,
  FaBirthdayCake,
  FaHome,
  FaPhone,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../css/UpdateStudent.css";

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    roll_no: "",
    study_class: "",
    age: "",
    address: "",
    phone_no: "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:8081/student/${id}`);
        const data = await res.json();
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student:", error);
        toast.error("❌ Failed to load student data.");
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8081/student/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      toast.success("✅ Student updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("❌ Failed to update student.");
    }
  };

  return (
    <div className="update-container">
      <h2>✏️ Update Student</h2>

      <form onSubmit={handleSubmit} className="update-form">
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Enter Name"
            required
          />
        </div>

        <div className="input-group">
          <FaListOl className="input-icon" />
          <input
            type="text"
            name="roll_no"
            value={student.roll_no}
            onChange={handleChange}
            placeholder="Enter Roll No"
            required
          />
        </div>

        <div className="input-group">
          <FaChalkboardTeacher className="input-icon" />
          <input
            type="text"
            name="study_class"
            value={student.study_class}
            onChange={handleChange}
            placeholder="Enter Class"
            required
          />
        </div>

        <div className="input-group">
          <FaBirthdayCake className="input-icon" />
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            placeholder="Enter Age"
            required
          />
        </div>

        <div className="input-group">
          <FaHome className="input-icon" />
          <input
            type="text"
            name="address"
            value={student.address}
            onChange={handleChange}
            placeholder="Enter Address"
            required
          />
        </div>

        <div className="input-group">
          <FaPhone className="input-icon" />
          <input
            type="text"
            name="phone_no"
            value={student.phone_no}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            required
          />
        </div>

        <div className="button-group">
          <button type="button" className="btn back" onClick={() => navigate("/")}>
            <FaArrowLeft /> Back
          </button>
          <button type="submit" className="btn save">
            <FaSave /> Update
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default UpdateStudent;


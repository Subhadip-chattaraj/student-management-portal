import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import { FaUser, FaBirthdayCake, FaChalkboardTeacher, FaListOl, FaSave, FaRegAddressBook, FaPhone } from "react-icons/fa";

import { IoReturnUpBackSharp } from "react-icons/io5";
import "../css/AddStudent.css"; // CSS file for styling

const AddStudent = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    study_class: "",
    age: "",
    roll_no: "",
    address: "",
    phone_no: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    type: "", // "success" or "error"
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/student/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        setPopup({
          show: true,
          type: "success",
          message: "🎉 Student added successfully!",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000); // auto-redirect after 2 seconds
      } else {
        setPopup({
          show: true,
          type: "error",
          message: "❌ Failed to add student. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setPopup({
        show: true,
        type: "error",
        message: "⚠️ Something went wrong.",
      });
    }
  };

  return (
    <div className="add-student-container">
      <div className="header">
        <PiStudentBold className="logo" />
        <h2>Add Student</h2>
      </div>

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <FaUser /> Name:
          </label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <FaBirthdayCake /> Age:
          </label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            placeholder="Enter age"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <FaChalkboardTeacher /> Class:
          </label>
          <input
            type="text"
            name="study_class"
            value={student.study_class}
            onChange={handleChange}
            placeholder="Enter class"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <FaListOl /> Roll Number:
          </label>
          <input
            type="text"
            name="roll_no"
            value={student.roll_no}
            onChange={handleChange}
            placeholder="Enter roll number"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <FaRegAddressBook /> Address:
          </label>
          <input
            type="text"
            name="address"
            value={student.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>

        <div className="form-group">
          <label>
            <FaPhone /> Phone Number:
          </label>
          <input
            type="text"
            name="phone_no"
            value={student.phone_no}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            <FaSave /> Save
          </button>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/")}
          >
            <IoReturnUpBackSharp /> Back
          </button>
        </div>
      </form>
      {/* ✅ Beautiful Popup */}
      {popup.show && (
        <div className={`popup ${popup.type}`}>
          <div className="popup-content">
            <p>{popup.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;

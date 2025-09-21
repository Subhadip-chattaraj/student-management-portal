import React from "react";
import { PiStudentBold } from "react-icons/pi";

const Header = () => {
  const style = {
    backgroundColor: "rgba(217, 217, 217, 1)",
    padding: "12px 20px",
    borderBottom: "1px solid #060606ff",
    display: "flex",            // use flexbox
    alignItems: "center",       // vertically center items
    gap: "10px"                 // space between icon and text
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    margin: 0                  // remove default h1 margin
  };

  const iconStyle = {
    fontSize: "28px",
    color: "#333"
  };

  return (
    <header style={style}>
      <PiStudentBold style={iconStyle} />
      <h1 style={titleStyle}>Student Management System</h1>
    </header>
  );
};

export default Header;

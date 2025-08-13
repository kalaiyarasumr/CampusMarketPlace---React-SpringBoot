import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./cm-logo.avif"; // logo import
import "./assets/style.css";

export default function Logo({ searchTerm, onSearchChange }) {
  const navigate = useNavigate();

  return (
    <div
      className="logo-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 20px",
        gap: "20px",
        flexWrap: "wrap",
        // Removed backgroundColor and boxShadow for transparency
      }}
    >
      {/* Logo + Navigation links container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          flexWrap: "wrap",
          flexGrow: 1,
        }}
      >
        {/* Logo on left */}
        <div
          onClick={() => navigate("/customerhome")}
          style={{ display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }}
        >
          <img
            src={logo}
            alt="Campus Marketplace Logo"
            className="logo-image"
            style={{ height: "40px", width: "auto", marginRight: "8px" }}
            onError={(e) => {
              e.target.src = "fallback-logo.png";
            }}
          />
          <span
            className="logo-text"
            style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}
          >
            Campus Marketplace
          </span>
        </div>

    {/* Navigation Links */}
{/* Navigation Links */}
<nav
  style={{
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: "600",
    marginLeft: "290px",
    color: "black",
  }}
>
  <button
    onClick={() => navigate("/customerhome")}
    style={{
      background: "none",
      border: "none",        // ✅ Removed border
      color: "black",
      cursor: "pointer",
    }}
  >
    Home
  </button>
  <button
    onClick={() => navigate("/listings")}
    style={{
      background: "none",
      border: "none",        // ✅ Removed border
      color: "black",
      cursor: "pointer",
    }}
  >
    All Listings
  </button>
</nav>


</div>

      {/* Search Bar on right */}
     <div
  style={{
    maxWidth: "300px",
    flexGrow: 1,
    position: "relative",
    marginLeft: "170px", // ✅ Slight shift to the left
  }}
>
  {/* Search Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#00ABE4"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    width="20"
    height="0"
    style={{
      position: "absolute",
      top: "50%",
      left: "12px",
      transform: "translateY(-50%)",
      pointerEvents: "none",
    }}
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>

  {/* Search Input */}
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => onSearchChange(e.target.value)}
    style={{
      width: "100%",
      padding: "8px 12px 8px 36px", // space for icon
      borderRadius: "20px",
      border: "1.5px solid #00ABE4",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.3s",
    }}
  />
</div>
</div>
  );
}

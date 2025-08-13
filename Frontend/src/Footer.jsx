import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#00ABE4",
        color: "#000000ff",
        padding: "40px 20px",
        marginTop: "50px",
      }}
    >
      {/* Top Section: 4 Columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* About Section */}
        <div style={{ marginLeft: "-60px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
            About Campus Marketplace
          </h3>
          <p style={{ color: "#090909ff", lineHeight: "1.6" }}>
            The trusted student marketplace connecting buyers and sellers across
            Indian universities.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "15px" }}>
            <FaFacebook size={20} />
            <FaTwitter size={20} />
            <FaInstagram size={20} />
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ marginLeft: "250px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
            Quick Links
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#090909ff" }}>
            <li>Home</li>
            <li>Browse Listings</li>
            <li>Sell an Item</li>
          </ul>
        </div>

        {/* Help & Support */}
        <div style={{ marginLeft: "100px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
            Help & Support
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#0a0a0aff" }}>
            <li>About Us</li>
            <li>FAQs</li>
            <li>Safety Tips</li>
            <li>Contact Us</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div
        style={{
          borderTop: "1px solid #334155",
          marginTop: "30px",
          paddingTop: "15px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          color: "#0b0b0bff",
          fontSize: "0.9rem",
        }}
      >
        <div>© {new Date().getFullYear()} Campus Marketplace. All rights reserved.</div>
      </div>
    </footer>
  );
}

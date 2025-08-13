"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import Logo from "./Logo";
import "./assets/style.css";
import CustomModal from "./CustomModal";
import { FaUsers, FaBox, FaShoppingCart, FaCogs } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [response, setResponse] = useState(null);

  const cardData = [
    {
      title: "Add Product",
      description: "Create and manage new product listings with validation",
      team: "Product Management",
      modalType: "addProduct",
    },
    {
      title: "Delete Product",
      description: "Remove products from inventory system",
      team: "Product Management",
      modalType: "deleteProduct",
    },
    {
      title: "View User Details",
      description: "Fetch and display details of a specific user",
      team: "User Management",
      modalType: "viewUser",
    },
    {
      title: "Modify User",
      description: "Update user details and manage roles",
      team: "User Management",
      modalType: "modifyUser",
    },
    // },
    // {
    //   title: "Monthly Business",
    //   description: "View revenue metrics for specific months",
    //   team: "Analytics",
    //   modalType: "monthlyBusiness",
    // },
    // {
    //   title: "Daily Business",
    //   description: "Track daily revenue and transactions",
    //   team: "Analytics",
    //   modalType: "dailyBusiness",
    // },
    // {
    //   title: "Yearly Business",
    //   description: "Analyze annual revenue performance",
    //   team: "Analytics",
    //   modalType: "yearlyBusiness",
    // },
    // {
    //   title: "Overall Business",
    //   description: "View total revenue since inception",
    //   team: "Analytics",
    //   modalType: "overallBusiness",
    // },
    ,
  ];

  const apiCall = async (url, options = {}, successModal, errorModal = "response") => {
    try {
      const res = await fetch(url, { credentials: "include", ...options });
      const data = res.headers.get("content-type")?.includes("application/json")
        ? await res.json()
        : await res.text();

      if (res.ok) {
        setResponse(typeof data === "object" ? data : { message: data });
        setModalType(successModal);
      } else {
        setResponse({
          message: `Error: ${typeof data === "string" ? data : JSON.stringify(data)}`,
        });
        setModalType(errorModal);
      }
    } catch (error) {
      console.error("API call error:", error);
      setResponse({ message: "Error: Something went wrong" });
      setModalType(errorModal);
    }
  };

  const handleSubmit = (data) => {
    switch (modalType) {
      case "addProduct":
        return apiCall(
          "http://localhost:9090/admin/products/add",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
          "response"
        );
      case "deleteProduct":
        return apiCall(
          "http://localhost:9090/admin/products/delete",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: data.productId }),
          },
          "response"
        );
      case "viewUser":
        return apiCall("http://localhost:9090/admin/user/getAll", { method: "GET" }, "response");
      case "modifyUser":
        if (!data.username) {
          return apiCall("http://localhost:9090/admin/user/getAll", { method: "GET" }, "modifyUser");
        }
        return apiCall(
          "http://localhost:9090/admin/user/modify",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
          "response"
        );
      case "monthlyBusiness":
        return apiCall(
          `http://localhost:9090/admin/business/monthly?month=${data.month}&year=${data.year}`,
          { method: "GET" },
          "monthlyBusiness"
        );
      case "dailyBusiness":
        return apiCall(
          `http://localhost:9090/admin/business/daily?date=${data.date}`,
          { method: "GET" },
          "dailyBusiness"
        );
      case "yearlyBusiness":
        return apiCall(
          `http://localhost:9090/admin/business/yearly?year=${data.year}`,
          { method: "GET" },
          "yearlyBusiness"
        );
      case "overallBusiness":
        return apiCall("http://localhost:9090/admin/business/overall", { method: "GET" }, "overallBusiness");
      default:
        console.error("Unknown modal type:", modalType);
    }
  };

  return (
    <div className="admin-dashboard" style={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <header
        className="admin-header"
        style={{
          padding: "12px 24px",
          backgroundColor: "rgba(21, 164, 241, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Logo />
        <div
          className="admin-nav"
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <button
            style={{
              backgroundColor: "#427cbfff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 2px 6px rgba(74, 144, 226, 0.4)",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#357ABD";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(53, 122, 189, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#4a90e2";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(74, 144, 226, 0.4)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = "#2a5d8f";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(42, 93, 143, 0.8)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = "#357ABD";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(53, 122, 189, 0.6)";
            }}
            onClick={() => navigate("/")}
          >
            Home
          </button>

         

          <button
            style={{
              backgroundColor: "#427cbfff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 2px 6px rgba(74, 144, 226, 0.4)",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#357ABD";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(53, 122, 189, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#4a90e2";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(74, 144, 226, 0.4)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = "#2a5d8f";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(42, 93, 143, 0.8)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = "#357ABD";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(53, 122, 189, 0.6)";
            }}
            onClick={() => navigate("/admin")}
          >
            Logout
          </button>
        </div>
      </header>

      <main
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 72px - 64px)", // header + footer approx height
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          {cardData.map((card, index) => {
            let IconComponent;
            if (card.title.includes("User")) IconComponent = FaUsers;
            else if (card.title.includes("Product")) IconComponent = FaBox;
            else if (card.title.includes("Order")) IconComponent = FaShoppingCart;
            else IconComponent = FaCogs;

            return (
              <div
                key={index}
                onClick={() => {
                  setModalType(card.modalType);
                  setModalData(null);
                }}
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "transform 0.2s",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <IconComponent size={40} color="#4a90e2" style={{ marginBottom: "10px" }} />
                <h3 style={{ fontSize: "1.2rem", margin: "0 0 10px 0" }}>{card.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>{card.description}</p>
              </div>
            );
          })}
        </div>
      </main>

      {modalType && (
        <CustomModal
          modalType={modalType}
          onClose={() => {
            setModalType(null);
            setResponse(null);
          }}
          onSubmit={handleSubmit}
          response={response}
        />
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;

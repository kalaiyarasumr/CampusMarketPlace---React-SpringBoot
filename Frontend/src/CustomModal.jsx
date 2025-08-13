"use client";

import { useEffect, useState } from "react";

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  padding: 20,
};

const modalContainerStyle = {
  backgroundColor: "#fff",
  width: "100%",
  maxWidth: 520,
  borderRadius: 12,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  display: "flex",
  flexDirection: "column",
  maxHeight: "90vh",
  overflowY: "auto",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const modalHeaderStyle = {
  padding: "20px 24px",
  borderBottom: "1px solid #eee",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const modalTitleStyle = {
  margin: 0,
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "#333",
};

const modalCloseBtnStyle = {
  background: "transparent",
  border: "none",
  fontSize: "1.8rem",
  lineHeight: 1,
  cursor: "pointer",
  color: "#888",
  transition: "color 0.2s ease",
};

const modalBodyStyle = {
  padding: 24,
  fontSize: "1rem",
  color: "#444",
};

const modalFormStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  fontWeight: 600,
  color: "#555",
};

const inputStyle = {
  marginTop: 6,
  padding: "10px 14px",
  borderRadius: 8,
  border: "1.5px solid #ccc",
  fontSize: "1rem",
  fontFamily: "inherit",
  transition: "border-color 0.3s ease",
};

const inputFocusStyle = {
  borderColor: "#4a90e2",
  boxShadow: "0 0 5px rgba(74, 144, 226, 0.5)",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  minHeight: 80,
};

const buttonBaseStyle = {
  padding: "12px 0",
  border: "none",
  borderRadius: 8,
  fontWeight: 700,
  fontSize: "1.1rem",
  cursor: "pointer",
  boxShadow: "0 5px 12px rgba(74, 144, 226, 0.5)",
  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
};

const submitBtnStyle = {
  ...buttonBaseStyle,
  backgroundColor: "#4a90e2",
  color: "white",
};

const submitBtnHoverStyle = {
  backgroundColor: "#357abd",
  boxShadow: "0 6px 16px rgba(53, 122, 189, 0.7)",
};

const submitBtnActiveStyle = {
  backgroundColor: "#2a5d8f",
  boxShadow: "0 3px 8px rgba(42, 93, 143, 0.8)",
};

const dangerBtnStyle = {
  ...buttonBaseStyle,
  backgroundColor: "#e74c3c",
  boxShadow: "0 5px 12px rgba(231, 76, 60, 0.5)",
  color: "white",
};

const dangerBtnHoverStyle = {
  backgroundColor: "#c0392b",
  boxShadow: "0 6px 16px rgba(192, 57, 43, 0.7)",
};

const dangerBtnActiveStyle = {
  backgroundColor: "#992d22",
  boxShadow: "0 3px 8px rgba(153, 45, 34, 0.8)",
};

const businessReportStyle = {
  lineHeight: 1.6,
  color: "#222",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  borderBottom: "2px solid #ddd",
  padding: "8px",
  textAlign: "left",
  fontWeight: "600",
  color: "#555",
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "8px",
  color: "#444",
};

const responseMessageSuccess = {
  color: "#2a9d8f",
  fontWeight: "600",
  marginBottom: 12,
};

const responseMessageError = {
  color: "#e63946",
  fontWeight: "600",
  marginBottom: 12,
};

const productImageStyle = {
  maxWidth: "100%",
  height: "auto",
  borderRadius: 8,
  marginTop: 10,
};

const CustomModal = ({ modalType, onClose, onSubmit, response }) => {
  const [formData, setFormData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    setFormData({});
    setInputValue("");
    setUsersList([]);
  }, [modalType]);

  useEffect(() => {
    if (modalType === "viewUser") {
      fetch("http://localhost:9090/admin/user/getAll", { method: "GET", credentials: "include" })
        .then((res) => res.json())
        .then(setUsersList)
        .catch(console.error);
    }
  }, [modalType]);

  // input focus handling for inline style (React doesn't do CSS :focus inline),
  // so we will just skip it or keep default border

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneralInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (modalType) {
      case "addProduct":
        onSubmit({
          name: formData.name || "",
          description: formData.description || "",
          price: parseFloat(formData.price) || 0,
          stock: parseInt(formData.stock, 10) || 0,
          categoryId: parseInt(formData.categoryId, 10) || 0,
          imageUrl: formData.imageUrl || "",
        });
        break;

      case "deleteProduct":
        onSubmit({ productId: parseInt(inputValue, 10) });
        break;

      case "modifyUser":
        if (!response?.user) {
          onSubmit({ userId: parseInt(inputValue, 10) });
        } else {
          const username = formData.username || response.user.username;
          const email = formData.email || response.user.email;
          const role = formData.role || response.user.role;
          onSubmit({ userId: response.user.userId, username, email, role });
        }
        break;

      case "monthlyBusiness":
        onSubmit({ month: formData.month, year: formData.year });
        break;

      case "dailyBusiness":
        onSubmit({ date: formData.date });
        break;

      case "yearlyBusiness":
        onSubmit({ year: formData.year });
        break;

      case "overallBusiness":
        onSubmit({});
        break;

      default:
        console.error("Unknown modal type:", modalType);
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContainerStyle}>
        <header style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>
            {{
              addProduct: "Add Product",
              deleteProduct: "Delete Product",
              viewUser: "All Users",
              modifyUser: "Modify User",
              monthlyBusiness: "Monthly Business",
              dailyBusiness: "Daily Business",
              yearlyBusiness: "Yearly Business",
              overallBusiness: "Overall Business",
              response: "Operation Result",
            }[modalType]}
          </h2>
          <button
            style={modalCloseBtnStyle}
            onClick={onClose}
            aria-label="Close modal"
            onMouseOver={(e) => (e.currentTarget.style.color = "#4a90e2")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#888")}
          >
            ×
          </button>
        </header>

        <section style={modalBodyStyle}>
          {/* Add Product */}
          {modalType === "addProduct" && (
            <form onSubmit={handleSubmit} style={modalFormStyle}>
              <label style={labelStyle}>
                Name
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </label>
              <label style={labelStyle}>
                Description
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  style={textareaStyle}
                />
              </label>
              <label style={labelStyle}>
                Price
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </label>
              <label style={labelStyle}>
                Stock
                <input
                  type="number"
                  name="stock"
                  value={formData.stock || ""}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </label>
              <label style={labelStyle}>
                Category ID
                <input
                  type="number"
                  name="categoryId"
                  value={formData.categoryId || ""}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </label>
              <label style={labelStyle}>
                Image URL
                <input
                  name="imageUrl"
                  value={formData.imageUrl || ""}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </label>
              <button
                type="submit"
                style={submitBtnStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                  e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = submitBtnStyle.backgroundColor;
                  e.currentTarget.style.boxShadow = submitBtnStyle.boxShadow;
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = submitBtnActiveStyle.backgroundColor;
                  e.currentTarget.style.boxShadow = submitBtnActiveStyle.boxShadow;
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                  e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                }}
              >
                Submit
              </button>
            </form>
          )}

          {/* Delete Product */}
          {modalType === "deleteProduct" && (
            <form onSubmit={handleSubmit} style={modalFormStyle}>
              <label style={labelStyle}>
                Product ID
                <input
                  type="number"
                  placeholder="Enter Product ID"
                  value={inputValue}
                  onChange={handleGeneralInputChange}
                  required
                  style={inputStyle}
                />
              </label>
              <button
                type="submit"
                style={dangerBtnStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = dangerBtnHoverStyle.backgroundColor;
                  e.currentTarget.style.boxShadow = dangerBtnHoverStyle.boxShadow;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = dangerBtnStyle.backgroundColor;
                  e.currentTarget.style.boxShadow = dangerBtnStyle.boxShadow;
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = dangerBtnActiveStyle.backgroundColor;
                  e.currentTarget.style.boxShadow = dangerBtnActiveStyle.boxShadow;
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = dangerBtnHoverStyle.backgroundColor;
                  e.currentTarget.style.boxShadow = dangerBtnHoverStyle.boxShadow;
                }}
              >
                Delete
              </button>
            </form>
          )}

          {/* View User */}
          {modalType === "viewUser" && (
            <>
              {usersList.length === 0 ? (
                <p>Loading users...</p>
              ) : (
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>User ID</th>
                      <th style={thStyle}>Username</th>
                      <th style={thStyle}>Email</th>
                      <th style={thStyle}>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user) => (
                      <tr key={user.userId}>
                        <td style={tdStyle}>{user.userId}</td>
                        <td style={tdStyle}>{user.username}</td>
                        <td style={tdStyle}>{user.email}</td>
                        <td style={tdStyle}>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* Modify User */}
          {modalType === "modifyUser" && (
            <>
              {!response?.user ? (
                <form onSubmit={handleSubmit} style={modalFormStyle}>
                  <label style={labelStyle}>
                    User ID
                    <input
                      type="number"
                      placeholder="Enter User ID"
                      value={inputValue}
                      onChange={handleGeneralInputChange}
                      required
                      style={inputStyle}
                    />
                  </label>
                  <button
                    type="submit"
                    style={submitBtnStyle}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnStyle.boxShadow;
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnActiveStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnActiveStyle.boxShadow;
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                    }}
                  >
                    Fetch User
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} style={modalFormStyle}>
                  <label style={labelStyle}>
                    Username
                    <input
                      name="username"
                      defaultValue={response.user.username}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </label>
                  <label style={labelStyle}>
                    Email
                    <input
                      type="email"
                      name="email"
                      defaultValue={response.user.email}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </label>
                  <label style={labelStyle}>
                    Role
                    <input
                      name="role"
                      defaultValue={response.user.role}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </label>
                  <button
                    type="submit"
                    style={submitBtnStyle}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnStyle.boxShadow;
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnActiveStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnActiveStyle.boxShadow;
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                    }}
                  >
                    Update User
                  </button>
                </form>
              )}
            </>
          )}

          {/* Monthly Business */}
          {modalType === "monthlyBusiness" && (
            <>
              {!response ? (
                <form onSubmit={handleSubmit} style={modalFormStyle}>
                  <label style={labelStyle}>
                    Month (1-12)
                    <input
                      type="number"
                      min="1"
                      max="12"
                      name="month"
                      value={formData.month || ""}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </label>
                  <label style={labelStyle}>
                    Year
                    <input
                      type="number"
                      min="1900"
                      max="2100"
                      name="year"
                      value={formData.year || ""}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </label>
                  <button
                    type="submit"
                    style={submitBtnStyle}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnStyle.boxShadow;
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnActiveStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnActiveStyle.boxShadow;
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                    }}
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <div style={businessReportStyle}>
                  <p>
                    <strong>Total Business:</strong> ₹{response?.monthlyBusiness?.totalBusiness?.toFixed(2)}
                  </p>
                  <h4>Category Sales:</h4>
                  <ul>
                    {Object.entries(response?.monthlyBusiness?.categorySales || {}).map(([category, sales]) => (
                      <li key={category}>
                        {category}: {sales}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Daily Business */}
          {modalType === "dailyBusiness" && (
            <>
              {!response ? (
                <form onSubmit={handleSubmit} style={modalFormStyle}>
                  <label style={labelStyle}>
                    Date (YYYY-MM-DD)
                    <input
                      type="date"
                      name="date"
                      value={formData.date || ""}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </label>
                  <button
                    type="submit"
                    style={submitBtnStyle}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnStyle.boxShadow;
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnActiveStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnActiveStyle.boxShadow;
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                    }}
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <div style={businessReportStyle}>
                  <p>
                    <strong>Total Business:</strong> ₹{response?.dailyBusiness?.totalBusiness?.toFixed(2)}
                  </p>
                  <h4>Category Sales:</h4>
                  <ul>
                    {Object.entries(response?.dailyBusiness?.categorySales || {}).map(([category, sales]) => (
                      <li key={category}>
                        {category}: {sales}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Yearly Business */}
          {modalType === "yearlyBusiness" && (
            <>
              {!response ? (
                <form onSubmit={handleSubmit} style={modalFormStyle}>
                  <label style={labelStyle}>
                    Year
                    <input
                      type="number"
                      min="1900"
                      max="2100"
                      name="year"
                      value={formData.year || ""}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </label>
                  <button
                    type="submit"
                    style={submitBtnStyle}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnStyle.boxShadow;
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnActiveStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnActiveStyle.boxShadow;
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                    }}
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <div style={businessReportStyle}>
                  <p>
                    <strong>Total Business:</strong> ₹{response?.yearlyBusiness?.totalBusiness?.toFixed(2)}
                  </p>
                  <h4>Category Sales:</h4>
                  <ul>
                    {Object.entries(response?.yearlyBusiness?.categorySales || {}).map(([category, sales]) => (
                      <li key={category}>
                        {category}: {sales}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Overall Business */}
          {modalType === "overallBusiness" && (
            <>
              {!response ? (
                <button
                  onClick={handleSubmit}
                  style={submitBtnStyle}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                    e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = submitBtnStyle.backgroundColor;
                    e.currentTarget.style.boxShadow = submitBtnStyle.boxShadow;
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.backgroundColor = submitBtnActiveStyle.backgroundColor;
                    e.currentTarget.style.boxShadow = submitBtnActiveStyle.boxShadow;
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.backgroundColor = submitBtnHoverStyle.backgroundColor;
                    e.currentTarget.style.boxShadow = submitBtnHoverStyle.boxShadow;
                  }}
                >
                  Get Overall Business
                </button>
              ) : (
                <div style={businessReportStyle}>
                  <p>
                    <strong>Total Business:</strong> ₹{response?.overallBusiness?.totalBusiness?.toFixed(2)}
                  </p>
                  <h4>Category Sales:</h4>
                  <ul>
                    {Object.entries(response?.overallBusiness?.categorySales || {}).map(([category, sales]) => (
                      <li key={category}>
                        {category}: {sales}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Response Modal */}
          {modalType === "response" && (
            <div>
              {response?.message && (
                <p
                  style={
                    response.message.toLowerCase().includes("error")
                      ? responseMessageError
                      : responseMessageSuccess
                  }
                >
                  {response.message}
                </p>
              )}
              {response?.product && (
                <div>
                  <h3>Product Added Successfully</h3>
                  <p>
                    <strong>ID:</strong> {response.product.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {response.product.name}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{response.product.price}
                  </p>
                  {response.imageUrl && (
                    <img
                      src={response.imageUrl || "/placeholder.svg"}
                      alt={response.product.name}
                      style={productImageStyle}
                    />
                  )}
                </div>
              )}
              {response?.user && !modalType.includes("modify") && (
                <div>
                  <h3>User Details</h3>
                  <p>
                    <strong>ID:</strong> {response.user.userId}
                  </p>
                  <p>
                    <strong>Username:</strong> {response.user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {response.user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {response.user.role}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CustomModal;

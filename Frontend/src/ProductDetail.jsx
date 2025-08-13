import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:9090/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Loading product details...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: 40, color: "red" }}>
        <p>{error}</p>
        <button onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 20,
          cursor: "pointer",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: 6,
          fontWeight: "bold",
        }}
      >
        ← Back to Products
      </button>
      <img
        src={product.images?.[0]}
        alt={product.name}
        style={{ width: "100%", maxHeight: 350, objectFit: "cover", borderRadius: 8 }}
        onError={(e) => {
          e.target.src = "https://i.pinimg.com/474x/b9/20/9e/b9209e2c03ef7da44b088e0791ffd011.jpg";
        }}
      />
      <h2 style={{ marginTop: 20 }}>{product.name}</h2>
      <p style={{ fontWeight: "bold", fontSize: 18, color: "#28a745" }}>${product.price}</p>
      <p style={{ marginTop: 16 }}>{product.description || "No description available."}</p>
    </div>
  );
};

export default ProductDetail;

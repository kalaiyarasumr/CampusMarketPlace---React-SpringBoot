import React from "react";

const baseURL = "http://localhost:9090/";

export function ProductList({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
        No products available.
      </p>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 cards per row
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        {products.map((product) => (
          <div
            key={product.product_id}
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              minHeight: "380px", // Equal height cards
            }}
          >
            <img
              src={
                product.images?.[0]
                  ? product.images[0].startsWith("http")
                    ? product.images[0]
                    : baseURL + product.images[0]
                  : "https://via.placeholder.com/200x200"
              }
              alt={product.name}
              style={{
                width: "100%",
                height: "200px", // Uniform image height
                objectFit: "cover",
                borderRadius: "8px",
              }}
              loading="lazy"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200x200";
              }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", margin: "10px 0" }}>
                {product.name}
              </h3>
              <p style={{ flexGrow: 1, fontSize: "0.9rem", color: "#555" }}>
                {product.description}
              </p>
              <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                ${product.price}
              </p>
              <button
                style={{
                  marginTop: "auto",
                  padding: "8px 12px",
                  background: "#4cafef",
                  border: "none",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => onAddToCart(product.product_id)} // pass product_id only
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

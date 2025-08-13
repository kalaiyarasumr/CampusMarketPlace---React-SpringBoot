import React, { useState, useEffect } from 'react';
import { CategoryNavigation } from './CategoryNavigation';
import { Header } from './Header';
import { Footer } from './Footer';
import './assets/style.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('');
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    if (username) {
      fetchCartCount();
    }
  }, [username]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/orders', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data.products || []);
      setUsername(data.username || 'Guest');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    setIsCartLoading(true);
    try {
      const response = await fetch(`http://localhost:9090/api/cart/items/count?username=${username}`, {
        credentials: 'include',
      });
      const count = await response.json();
      setCartCount(count);
      setCartError(false);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartError(true);
    } finally {
      setIsCartLoading(false);
    }
  };

  return (
    <div className="maindiv">
      <div className="customer-homepage">
        <Header
          cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
          username={username}
        />

        <main
          style={{
            maxWidth: "1350px",  // increased for wider cards and spacing
            margin: "40px auto",
            padding: "0 20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <h1
            style={{
    fontSize: "2.4rem",
    fontWeight: 700,
    color: "#004d40",
    marginTop: "-30px",    // added this line to increase top margin
    marginBottom: "30px",
    textAlign: "center",
    letterSpacing: "0.03em",
  }}
          >
            Your Orders
          </h1>

          {loading && (
            <p
              style={{
                fontSize: "1.2rem",
                color: "#555",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              Loading orders...
            </p>
          )}

          {error && (
            <p
              style={{
                color: "#b00020",
                fontWeight: 600,
                textAlign: "center",
                marginTop: "40px",
              }}
            >
              {error}
            </p>
          )}

          {!loading && !error && orders.length === 0 && (
            <p
              style={{
                fontSize: "1.2rem",
                color: "#555",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              No orders found. Start shopping now!
            </p>
          )}

          {!loading && !error && orders.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(350px, 1fr))", // min width 350px now
                gap: "20px",
                width: "100%",
                maxWidth: "1350px",
              }}
            >
              {orders.map((order, index) => (
                <div
                  key={index}
                  style={{
                    background: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.07)",
                    transition: "transform 0.2s ease, boxShadow 0.2s ease",
                    cursor: "default",
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "350px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#00796b",
                      color: "#fff",
                      padding: "14px 20px",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                  >
                    <h3 style={{ margin: 0 }}><center>Product: {order.name}</center></h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      padding: "18px 20px",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={order.image_url || "https://via.placeholder.com/160?text=No+Image"}
                      alt={order.name}
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                    <div style={{ flex: 1, color: "#333" }}>
                      <h3
                        style={{
                          margin: "0 0 10px 0",
                          fontWeight: 700,
                          fontSize: "1.25rem",
                          color: "#00695c",
                        }}
                      >
                      
                      </h3>
                      <p style={{ margin: "4px 0", fontSize: "1rem", fontWeight: 500, color: "#555" }}>
                        <strong>Description:</strong> {order.description}
                      </p>
                      <p style={{ margin: "4px 0", fontSize: "1rem", fontWeight: 500, color: "#555" }}>
                        <strong>Quantity:</strong> {order.quantity}
                      </p>
                      <p style={{ margin: "4px 0", fontSize: "1rem", fontWeight: 500, color: "#555" }}>
                        <strong>Price per Unit:</strong> ₹{order.price_per_unit.toFixed(2)}
                      </p>
                      <p style={{ margin: "4px 0", fontSize: "1rem", fontWeight: 500, color: "#555" }}>
                        <strong>Total Price:</strong> ₹{order.total_price.toFixed(2)}
                      </p>
                      <p style={{ margin: "4px 0", fontSize: "1rem", fontWeight: 500, color: "#555" }}>
                        <strong>Order ID:</strong> {order.order_id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

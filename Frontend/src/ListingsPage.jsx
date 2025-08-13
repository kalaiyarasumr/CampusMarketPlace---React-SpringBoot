import React, { useState, useEffect } from 'react';
import { ProductList } from './ProductList';
import { Header } from './Header';
import { Footer } from './Footer';
import './assets/style.css';

export default function ListingPage() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('');
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [toastMessage, setToastMessage] = useState(''); // For toast messages
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (username && username !== 'Guest') {
      fetchCartCount();
    }
  }, [username]);

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const response = await fetch(`http://localhost:9090/api/products`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data) {
        if (!username) {
          setUsername(data.user?.name || 'Guest');
        }
        setProducts(data.products || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const fetchCartCount = async () => {
    setIsCartLoading(true);
    try {
      const response = await fetch(
        `http://localhost:9090/api/cart/items/count?username=${username}`,
        { credentials: 'include' }
      );
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

  const handleAddToCart = async (productId) => {
    if (!username) {
      console.error('Username is required to add items to the cart');
      return;
    }
    try {
      const response = await fetch('http://localhost:9090/api/cart/add', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, productId }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        fetchCartCount();

        // Show success toast
        setToastMessage('Product added to cart!');
        setShowToast(true);

        // Hide toast after 3 seconds
        setTimeout(() => setShowToast(false), 3000);
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="listing-page" style={{ position: 'relative' }}>
      <Header
        cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
        username={username}
      />

      {/* Toast message */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#4BB543',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            zIndex: 1000,
            fontWeight: '600',
          }}
        >
          {toastMessage}
        </div>
      )}

      <main className="main-content container">
        {isLoadingProducts ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading products...</p>
          </div>
        ) : (
          <ProductList products={products} onAddToCart={handleAddToCart} />
        )}
      </main>

      <Footer />
    </div>
  );
}

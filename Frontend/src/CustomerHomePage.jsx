import React, { useState, useEffect } from 'react';
import { CategoryNavigation } from './CategoryNavigation';
import { ProductList } from './ProductList';
import { Footer } from './Footer';
import { Header } from './Header';
import './assets/style.css';

const carouselImages = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80', // students studying / campus vibe
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80', // books and laptop on desk
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80', // college campus outside
];

export default function CustomerHomePage() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('');
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (username && username !== 'Guest') {
      fetchCartCount();
    }
  }, [username]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Auto slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async (category = '') => {
    setIsLoadingProducts(true);
    try {
      const response = await fetch(`http://localhost:9090/api/products`, { credentials: 'include' });
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

  const handleCategoryClick = (category) => {
    fetchProducts(category);
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
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="customer-homepage">
      <Header
        cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
        username={username}
      />

      {/* Hero carousel without section tag */}
      <div
        className="carousel-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          overflow: 'hidden',
        }}
      >
        <img
          src={carouselImages[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'brightness(0.7)',
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
        <div
          className="hero-content"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            zIndex: 10,
            padding: '0 20px',
            maxWidth: '800px',
            width: '90%',
          }}
        >
          <h1
            className="hero-title"
            style={{ fontSize: '3rem', margin: '0 0 15px' }}
          >
            Welcome {username !== 'Guest' ? username : 'to Our Store'}!
          </h1>
          <p
            className="hero-subtitle"
            style={{ fontSize: '1.2rem', margin: '0 0 25px' }}
          >
            Discover the latest trends, exclusive deals, and top-quality products all in one place.
          </p>
         <button
      className="cta-button"
      style={{
        marginTop: '20px',
        padding: '12px 30px',
        fontSize: '1.2rem',
        backgroundColor: '#ff6f61',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e85c4d')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ff6f61')}
      onClick={() => navigate('/listings')}
    >
      Buy Now
    </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content container">
        {isLoadingProducts ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading products...</p>
          </div>
        ) : (
          <div className="product-layout">
            {/* Featured Collection Sidebar */}
            <aside className="featured-collection">
              <h3 className="featured-title">Featured Collection</h3>
            </aside>

            {/* Main Product Listing */}
            <div className="product-main">
              {/* <CategoryNavigation onCategoryClick={handleCategoryClick} /> */}
              <ProductList products={products} onAddToCart={handleAddToCart} />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

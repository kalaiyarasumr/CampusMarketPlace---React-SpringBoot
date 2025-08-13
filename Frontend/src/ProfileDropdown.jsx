import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBox, FaSignOutAlt } from 'react-icons/fa';
import useravatar from './useravatar.png';

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('User successfully logged out');
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleOrdersClick = () => {
    navigate('/orders');
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={toggleDropdown}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '50px',
          padding: '6px 12px',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = '#f8f9fa')}
        onMouseOut={(e) => (e.currentTarget.style.background = '#fff')}
      >
        <img
          src={useravatar}
          alt="User Avatar"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
          }}
          onError={(e) => { e.target.src = 'fallback-logo.png'; }}
        />
        <span style={{ fontWeight: '500', fontSize: '14px' }}>
          {username || 'Guest'}
        </span>
        <span
          style={{
            border: 'solid #555',
            borderWidth: '0 1.5px 1.5px 0',
            padding: '3px',
            marginLeft: '4px',
            transform: isOpen ? 'rotate(-135deg)' : 'rotate(45deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '110%',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            minWidth: '160px',
            overflow: 'hidden',
            zIndex: 100,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#f1f1f1')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'white')}
          >
            <FaUser style={{ fontSize: '14px' }} /> Profile
          </div>

          <div
            onClick={handleOrdersClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#f1f1f1')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'white')}
          >
            <FaBox style={{ fontSize: '14px' }} /> Orders
          </div>

          <div
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              fontSize: '14px',
              cursor: 'pointer',
              color: '#d9534f',
              transition: 'background 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#f1f1f1')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'white')}
          >
            <FaSignOutAlt style={{ fontSize: '14px' }} /> Logout
          </div>
        </div>
      )}
    </div>
  );
}

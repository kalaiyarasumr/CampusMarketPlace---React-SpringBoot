import React from "react";
import { Routes, Route } from "react-router-dom";

import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import CustomerHomePage from "./CustomerHomePage";
import CartPage from "./CartPage";
import OrdersPage from "./OrderPage";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ProductDetail from "./ProductDetail";
import HomePage from "./HomePage";
import ListingsPage from "./ListingsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/customerhome" element={<CustomerHomePage />} />
      <Route path="/CustomerHomePage" element={<CustomerHomePage />} /> {/* Duplicate for case sensitivity */}
      <Route path="/UserCartPage" element={<CartPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/listings" element={<ListingsPage />} />
    </Routes>
  );
};

export default AppRoutes;

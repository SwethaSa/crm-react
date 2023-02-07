import React from "react";
import SignUpForm from "./componenets/SignUp";
import Login from "./componenets/Login";
import ForgotPassword from "./componenets/ForgotPassword";
import ResetPassword from "./componenets/Resetpassword";
import Dashboard from "./componenets/Dashboard";

import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes >
        <Route path="/" element={<SignUpForm />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>

      </Routes>
    </div>
  );
}

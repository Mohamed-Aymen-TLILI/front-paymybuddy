import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilPage from "./pages/ProfilPage"
import LoginPage from "./pages/LoginPage";
import ContactsPages from "./pages/ContactsPage";
import AuthAPI from "./services/authAPI";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer, toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import TransferPage from "./pages/TransferPage";
import BankPage from "./pages/BankPage";

AuthAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      <HashRouter>
        <Navbar />

        <main className="container pt-5">
          <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/profil" element={ <PrivateRoute/>}>
              <Route path="/profil" element={<ProfilPage/> }/>
            </Route>
            <Route path="/contacts" element={ <PrivateRoute/>}>
              <Route path="/contacts" element={<ContactsPages/> }/>
            </Route>
            <Route path="/transaction" element={ <PrivateRoute/>}>
              <Route path="/transaction" element={<TransferPage/> }/>
            </Route>
            <Route path="/bank" element={ <PrivateRoute/>}>
              <Route path="/bank" element={<BankPage/> }/>
            </Route>
            <Route path="/" element={<HomePage/> }/>
          </Routes>
        </main>
      </HashRouter>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </AuthContext.Provider>
  );
};

export default App;

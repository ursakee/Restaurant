import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Menu from "./views/Menu";
import Item from "./views/Item";
import Order from "./views/Order";
import InvalidQRCodePage from "./views/InvalidQRCode";

// Context
import { NavbarProvider } from "./context/NavbarContext";
import { CartProvider } from "./context/CartContext";
import { QRProvider, QRValidator } from "./context/QRContext";
import { SocketProvider } from "./context/SocketContext";

const App = () => {
  return (
    <Router>
      <CartProvider>
        <QRProvider>
          <SocketProvider>
            <NavbarProvider>
              <Navbar />
              <QRValidator>
                <Routes>
                  <Route path="/" element={<Menu />} />
                  <Route path="/item/:id" element={<Item />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/invalid-qr" element={<InvalidQRCodePage />} />
                </Routes>
              </QRValidator>
            </NavbarProvider>
          </SocketProvider>
        </QRProvider>
      </CartProvider>
    </Router>
  );
};

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Catalog from './pages/Catalog';
import BestSellers from './pages/BestSellers';
import Cart from './components/Cart';
import './index.css';
import { CartProvider } from './context/CartContext';

const AppRoutes = ({ openCart }) => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/best-sellers" element={<BestSellers />} />
    </Routes>
);

const App = () => {
    const [isCartOpen, setCartOpen] = useState(false);

    const openCart = () => setCartOpen(true);
    const closeCart = () => setCartOpen(false);

    return (
        <CartProvider>
            <Router>
                <Navbar openCart={openCart} />
                <div className="app">
                    <AppRoutes openCart={openCart} />
                </div>
                {isCartOpen && <div className="cart-backdrop" onClick={closeCart}></div>}
                <Cart isCartOpen={isCartOpen} closeCart={closeCart} />
            </Router>
        </CartProvider>
    );
};

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [books, setBooks] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5003/api/cart')
            .then(response => setCartItems(response.data))
            .catch(error => console.error('Error fetching cart:', error));
    }, []);

    const addToCart = (book) => {
        axios.post('http://localhost:5003/api/cart', book)
            .then(response => setCartItems(response.data))
            .catch(error => console.error('Error adding to cart:', error));
    };

    const removeFromCart = (bookId) => {
        axios.delete(`http://localhost:5003/api/cart/${bookId}`)
            .then(response => setCartItems(response.data))
            .catch(error => console.error('Error removing from cart:', error));
    };

    const fetchBooks = () => {
        axios.get('http://localhost:5003/api/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    };

    const fetchBooksByGenre = (genre) => {
        axios.get(`http://localhost:5003/api/books/genre/${genre}`)
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books by genre:', error));
    };

    const fetchBestSellers = () => {
        axios.get('http://localhost:5003/api/books/best-sellers')
            .then(response => setBestSellers(response.data))
            .catch(error => console.error('Error fetching best sellers:', error));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, books, setBooks, bestSellers, fetchBooks, fetchBooksByGenre, fetchBestSellers }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

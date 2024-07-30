import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import '../styles/components/Navbar.css';

const Navbar = ({ openCart }) => {
    const { cartItems, fetchBooksByGenre } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            axios.get(`http://localhost:5003/api/search?query=${query}`)
                .then(response => setSearchResults(response.data))
                .catch(error => console.error('Error fetching search suggestions:', error));
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchSelect = (book) => {
        fetchBooksByGenre(book.genre);
        navigate(`/catalog?book=${book.title.toLowerCase()}`);
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>
                <img src="https://www.pngmart.com/files/22/Book-Logo-PNG-Pic.png" alt="Book Store" />
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to="/catalog">Catalog</Link></li>
                <li><Link to="/best-sellers">Best Sellers</Link></li>
            </ul>
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {searchResults.length > 0 && (
                    <div className="search-suggestions">
                        {searchResults.map(book => (
                            <div key={book.id} className="search-suggestion" onClick={() => handleSearchSelect(book)}>
                                {book.title} by {book.author}
                            </div>
                        ))}
                    </div>
                )}
                <div className="navbar-cart" onClick={openCart}>
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-badge">{getTotalItems()}</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

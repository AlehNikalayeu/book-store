import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';
import '../styles/pages/Catalog.css';

const Catalog = () => {
    const [books, setBooks] = useState([]);
    const { addToCart } = useCart();
    const [clickedItem, setClickedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const genre = params.get('genre');

        if (genre) {
            axios.get(`http://localhost:5003/api/books/genre/${genre}`)
                .then(response => setBooks(response.data))
                .catch(error => console.error('Error fetching books by genre:', error));
        } else {
            axios.get('http://localhost:5003/api/books')
                .then(response => setBooks(response.data))
                .catch(error => console.error('Error fetching books:', error));
        }
    }, [location.search]);

    const handleAddToCart = (book) => {
        addToCart(book);
        setClickedItem(book.id);
        setTimeout(() => {
            setClickedItem(null);
        }, 1000);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div className="catalog-container">
            <div className="catalog-photo">
                <img src="/background/wp4430570-books-4k-wallpapers.jpg" alt="catalog-background" />
            </div>
            <div className="catalog-overlay">
                <h1 className="catalog-title">Book Catalog</h1>
                <div className="catalog-grid">
                    {currentItems.map(book => (
                        <div key={book.id} className="book-card">
                            {book.bestSeller && <div className="bestseller-badge">Best Seller</div>}
                            <img src={book.image} alt={book.title} className="book-image" />
                            <div className="book-details">
                                <h2 className="book-title">{book.title}</h2>
                                <p className="book-author">{book.author}</p>
                                <p className="book-price">${book.price}</p>
                            </div>
                            <button
                                className={`add-to-cart-button ${clickedItem === book.id ? 'clicked' : ''}`}
                                onClick={() => handleAddToCart(book)}
                            >
                                {clickedItem === book.id ? 'Added!' : 'Add to Cart'}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    {[...Array(Math.ceil(books.length / itemsPerPage)).keys()].map(number => (
                        <button
                            key={number + 1}
                            onClick={() => setCurrentPage(number + 1)}
                            className={currentPage === number + 1 ? 'active' : ''}
                        >
                            {number + 1}
                        </button>
                    ))}
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(books.length / itemsPerPage)}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Catalog;

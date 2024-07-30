import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/pages/BestSellers.css';

const BestSellers = () => {
    const { addToCart, bestSellers, fetchBestSellers } = useCart();
    const [clickedItem, setClickedItem] = useState(null);

    useEffect(() => {
        fetchBestSellers();
    }, [fetchBestSellers]);

    const handleAddToCart = (book) => {
        addToCart(book);
        setClickedItem(book.id);
        setTimeout(() => {
            setClickedItem(null);
        }, 1000);
    };

    return (
        <div className="best-sellers-container">
            <div className="catalog-photo">
                <img src="/background/wp4430570-books-4k-wallpapers.jpg" alt="catalog-background" />
            </div>
            <div className="catalog-overlay">
                <h1 className="best-sellers-title">Best Sellers</h1>
                <div className="best-sellers-grid">
                    {bestSellers.map(book => (
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
            </div>
        </div>
    );
};

export default BestSellers;

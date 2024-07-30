import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const BookList = () => {
    const { books, addToCart } = useContext(CartContext);

    return (
        <div className="book-list">
            <h2>Books</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} - ${book.price}
                        <button onClick={() => addToCart(book)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;

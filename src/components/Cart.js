import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/components/Cart.css';

const Cart = ({ isCartOpen, closeCart }) => {
    const { cartItems, removeFromCart } = useCart();

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleOutsideClick = (event) => {
        if (event.target.closest('.cart') === null) {
            closeCart();
        }
    };

    useEffect(() => {
        if (isCartOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isCartOpen]);

    return (
        <div className={`cart ${isCartOpen ? 'open' : ''}`}>
            <div className="cart-header">
                <h2>Cart</h2>
                <button onClick={closeCart} className="close-cart">X</button>
            </div>
            <div className="cart-body">
                {cartItems.length > 0 ? (
                    <>
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.title} />
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.quantity} x ${item.price}</p>
                                    </div>
                                    <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-total">
                            <h3>Total: ${getTotal()}</h3>
                        </div>
                    </>
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
        </div>
    );
};

export default Cart;

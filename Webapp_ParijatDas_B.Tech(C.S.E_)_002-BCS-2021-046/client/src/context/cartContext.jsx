// CartContext.js
import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart items from localStorage on initial render
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Save cart items to localStorage whenever cartItems changes
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        calculateTotal();
    }, [cartItems]); // Runs when cartItems changes

    const addToCart = (product) => {
        const existingProduct = cartItems.find(item => item.id === product.id);
        if (existingProduct) {
            updateQuantity(product.id, existingProduct.quantity + 1);
        } else {
            setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map(item => 
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const calculateTotal = () => {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalAmount(total);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;

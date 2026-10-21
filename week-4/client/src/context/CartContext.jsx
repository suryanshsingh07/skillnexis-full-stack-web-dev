import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('nexis_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('nexis_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const addToCart = (product, quantity = 1) => {
    if (product.stock <= 0) {
      showToast(`"${product.name}" is currently out of stock.`, 'error');
      return false;
    }

    let addedSuccessfully = true;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product === product._id);

      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex];
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > product.stock) {
          showToast(`Cannot add more. Max available stock is ${product.stock}.`, 'warning');
          const updated = [...prevItems];
          updated[existingIndex] = {
            ...existingItem,
            quantity: product.stock
          };
          return updated;
        }

        const updated = [...prevItems];
        updated[existingIndex] = {
          ...existingItem,
          quantity: newQuantity
        };
        showToast(`Updated quantity of "${product.name}" in cart.`, 'success');
        return updated;
      } else {
        const itemQuantity = Math.min(quantity, product.stock);
        showToast(`Added "${product.name}" to cart.`, 'success');
        return [
          ...prevItems,
          {
            product: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            stock: product.stock,
            brand: product.brand,
            quantity: itemQuantity
          }
        ];
      }
    });

    return addedSuccessfully;
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product === productId) {
          const clampedQty = Math.min(newQuantity, item.stock);
          if (newQuantity > item.stock) {
            showToast(`Maximum available stock reached (${item.stock}).`, 'warning');
          }
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const removed = prevItems.find((item) => item.product === productId);
      if (removed) {
        showToast(`Removed "${removed.name}" from cart.`, 'info');
      }
      return prevItems.filter((item) => item.product !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = cartItems.length === 0 ? 0 : subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const total = Math.round((subtotal + shippingFee + tax) * 100) / 100;

  const value = {
    cartItems,
    cartCount,
    subtotal,
    shippingFee,
    tax,
    total,
    toast,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    showToast
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

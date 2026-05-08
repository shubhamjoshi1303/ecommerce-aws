import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useCart } from '../CartContext';
import { getImageUrl, getProductImage } from '../utils';
import './Cart.css';

function Cart({ user, onSignInClick }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [productsById, setProductsById] = useState({});
  const { refreshCartCount } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (user) loadCart();
    else setLoading(false);
  }, [user]);

  const loadProducts = async () => {
    try {
      const products = await api.getProducts();
      const map = {};
      products.forEach(product => {
        const id = product.product_id || product.id;
        if (id) map[id] = product;
      });
      setProductsById(map);
    } catch (error) {
      console.error('Error loading product lookup for cart:', error);
    }
  };

  const loadCart = async () => {
    try {
      const data = await api.getCart();
      setCart(data);
    } catch (error) {
      setMessage('Error loading cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await api.removeFromCart(productId);
      setMessage('Item removed');
      loadCart();
      refreshCartCount(); // Update cart badge
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error removing item');
    }
  };

  const handleCheckout = async () => {
    if (!cart?.items?.length) {
      setMessage('Cart is empty');
      return;
    }
    
    try {
      await api.createOrder();
      setMessage('Order placed successfully!');
      loadCart();
      refreshCartCount(); // Update cart badge
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error placing order');
    }
  };

  const getTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  if (loading) return <div className="loading">Loading cart...</div>;

  if (!user) return <div className="empty-cart">Please <button className="link-btn" onClick={onSignInClick}>sign in</button> to view your cart.</div>;

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {message && <div className="message">{message}</div>}
      
      {!cart?.items?.length ? (
        <div className="empty-cart">Your cart is empty</div>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map(item => {
              const itemId = item.product_id || item.id;
              const product = productsById[itemId];
              const productImage = product ? getImageUrl(getProductImage(product)) : null;

              return (
                <div key={itemId} className="cart-item">
                  {productImage && (
                    <div className="cart-item-image">
                      <img src={productImage} alt={product.name} />
                    </div>
                  )}
                  <div className="item-info">
                    <h3>{product?.name || itemId}</h3>
                    {!product?.name && <small className="item-id">{itemId}</small>}
                    {product?.description && <p className="item-description">{product.description}</p>}
                    <p>Quantity: {item.quantity}</p>
                    <p className="price">${Number(item.price).toFixed(2)} each</p>
                  </div>
                  <div className="item-actions">
                    <p className="subtotal">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                    <button onClick={() => handleRemove(itemId)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="cart-summary">
            <h2>Total: ${getTotal().toFixed(2)}</h2>
            <button className="checkout-btn" onClick={handleCheckout}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

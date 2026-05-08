import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { getImageUrl, getProductImage } from '../utils';
import './Orders.css';

function Orders({ user, onSignInClick }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsById, setProductsById] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (user) loadOrders();
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
      console.error('Error loading product lookup for orders:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  if (!user) return <div className="no-orders">Please <button className="link-btn" onClick={onSignInClick}>sign in</button> to view your orders.</div>;

  return (
    <div className="orders">
      <h1>My Orders</h1>
      
      {!orders.length ? (
        <div className="no-orders">No orders yet</div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className="status">{order.status}</span>
              </div>
              <p className="order-date">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
                  <div className="order-items">
                {order.items.map((item, idx) => {
                  const itemId = item.product_id || item.id;
                  const product = productsById[itemId];
                  const productImage = product ? getImageUrl(getProductImage(product)) : null;
                  const name = product?.name || itemId;

                  return (
                    <div key={idx} className="order-item">
                      {productImage && (
                        <div className="order-item-image">
                          <img src={productImage} alt={name} />
                        </div>
                      )}
                      <div className="order-item-details">
                        <span className="order-item-name">{name}</span>
                        {!product?.name && <small className="order-item-id">{itemId}</small>}
                        {product?.description && <p className="order-item-description">{product.description}</p>}
                      </div>
                      <span>Qty: {item.quantity}</span>
                      <span>${Number(item.price).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="order-total">
                <strong>Total: ${order.total_amount}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

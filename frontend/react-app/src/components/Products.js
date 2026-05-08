import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useCart } from '../CartContext';
import { getImageUrl, getProductImage } from '../utils';
import './Products.css';

function Products({ user, onSignInClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { refreshCartCount } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      setMessage('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      onSignInClick();
      return;
    }
    try {
      await api.addToCart(product.product_id, 1, product.price);
      setMessage(`Added ${product.name} to cart!`);
      refreshCartCount(); // Update cart badge
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding to cart');
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="products">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Cloud-native commerce, built on AWS.</h1>
          <p className="hero-subtitle">
            Modern ecommerce powered by scalable microservices, secure authentication, and globally distributed infrastructure.
          </p>
          <div className="hero-buttons">
            <button className="hero-btn primary" onClick={() => window.scrollTo({ top: document.querySelector('.product-grid').offsetTop - 100, behavior: 'smooth' })}>
              Shop Products
            </button>
            <button className="hero-btn secondary" onClick={() => window.open('https://github.com/shubhamjoshi1303/ecommerce-aws', '_blank', 'noopener')}>
              View Architecture
            </button>
          </div>
          <div className="architecture-strip">
            {['API Gateway', 'ECS Fargate', 'Cognito', 'DynamoDB', 'RDS', 'S3', 'CloudFront'].map((item) => (
              <span key={item} className="arch-pill">{item}</span>
            ))}
          </div>
        </div>
        <div className="hero-bg"></div>
      </div>
      {message && <div className="message">{message}</div>}
      <section className="featured-products">
        <h2>Featured Products</h2>
      </section>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.product_id} className="product-card">
            <img src={getImageUrl(getProductImage(product))} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-footer">
              <span className="price">${product.price}</span>
              <span className="stock">Stock: {product.stock}</span>
            </div>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

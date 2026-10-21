import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, getStockStatus } from '../utils/formatters';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const stockInfo = getStockStatus(product.stock);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (stockInfo.available) {
      addToCart(product, 1);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-card-img-wrap">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80';
          }}
        />
        <div className="product-card-badge">
          <span className={`badge badge-${stockInfo.type}`}>{stockInfo.label}</span>
        </div>
      </Link>

      <div className="product-card-body">
        <div className="product-brand">{product.brand || product.category}</div>
        <Link to={`/products/${product._id}`}>
          <h3 className="product-title" title={product.name}>
            {product.name}
          </h3>
        </Link>

        <div className="product-rating">
          <Star size={15} fill="#f59e0b" color="#f59e0b" />
          <span style={{ fontWeight: 600 }}>{product.rating?.toFixed(1) || '4.5'}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            ({product.numReviews || 0})
          </span>
        </div>

        <div className="product-footer">
          <div className="product-price">{formatPrice(product.price)}</div>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            disabled={!stockInfo.available}
            aria-label={`Add ${product.name} to cart`}
            style={{ padding: '0.45rem 0.85rem' }}
          >
            <ShoppingCart size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

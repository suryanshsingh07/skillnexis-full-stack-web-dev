import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Package, RefreshCw } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import api from '../services/api';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState('newest');
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/products/categories');
        if (res.data.success) {
          setCategories(res.data.categories || []);
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };

    fetchCategories();
  }, []);

  // Sync category or search query parameter updates
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get('search');
    if (q !== null) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  // Fetch filtered products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const params = new URLSearchParams();
        if (searchTerm.trim()) params.append('search', searchTerm.trim());
        if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
        if (selectedSort) params.append('sort', selectedSort);
        params.append('limit', '50');

        const res = await api.get(`/products?${params.toString()}`);
        if (res.data.success) {
          setProducts(res.data.products || []);
          setTotalProducts(res.data.total || 0);
        }
      } catch (err) {
        setError(err.message || 'Error fetching products.');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProducts();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, selectedSort]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('search', val);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category && category !== 'all') {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSort('newest');
    setSearchParams({});
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Explore Products
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Discover our full selection of verified electronics, fashion, and lifestyle gear.
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div className="search-input-wrap" style={{ flex: 1, minWidth: '280px' }}>
          <Search size={18} className="search-input-icon" />
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search products by title, category, or brand..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'} Found
          </span>
        </div>
      </div>

      {/* Catalog Layout: Sidebar + Product Grid */}
      <div className="catalog-layout">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
          onReset={handleResetFilters}
        />

        <div>
          {error && (
            <div style={{ padding: '1rem', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}

          <ProductGrid
            products={products}
            loading={loading}
            emptyMessage={
              searchTerm || selectedCategory !== 'all'
                ? 'No items matched your specific filters. Try searching with different terms or reset your filters.'
                : 'No products are currently available in the catalog.'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

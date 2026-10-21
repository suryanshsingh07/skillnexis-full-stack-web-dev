import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const FilterSidebar = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  selectedSort,
  onSelectSort,
  onReset
}) => {
  return (
    <aside
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        height: 'fit-content'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
          <Filter size={18} color="var(--primary)" />
          <span>Filters</span>
        </div>
        <button
          className="btn btn-outline btn-sm"
          onClick={onReset}
          style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
          title="Reset all filters"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort Section */}
      <div className="form-group">
        <label className="form-label">Sort Products By</label>
        <select
          className="form-select"
          value={selectedSort}
          onChange={(e) => onSelectSort(e.target.value)}
        >
          <option value="newest">Latest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="name_asc">Alphabetical (A-Z)</option>
        </select>
      </div>

      {/* Category Section */}
      <div style={{ marginTop: '1.5rem' }}>
        <label className="form-label" style={{ marginBottom: '0.75rem' }}>
          Categories
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <button
            type="button"
            className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start', textAlign: 'left', width: '100%', textTransform: 'capitalize' }}
            onClick={() => onSelectCategory('all')}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ justifyContent: 'flex-start', textAlign: 'left', width: '100%', textTransform: 'capitalize' }}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;

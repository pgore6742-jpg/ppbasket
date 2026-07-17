import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, X, ChevronDown, Check } from 'lucide-react';

export const Products: React.FC = () => {
  const {
    products,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    priceRange,
    setPriceRange,
    selectedRating,
    setSelectedRating,
    sortBy,
    setSortBy,
    resetFilters
  } = useApp();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Dynamic filter attributes extracted from actual products list
  const categoriesList = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const brandsList = ['All', ...Array.from(new Set(products.map(p => p.brand)))];

  // Filtering Logic
  const filteredProducts = products.filter(prod => {
    // 1. Search Query Match
    const matchesSearch = searchQuery
      ? prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // 2. Category Match
    const matchesCategory = selectedCategory === 'All' ? true : prod.category === selectedCategory;

    // 3. Brand Match
    const matchesBrand = selectedBrand === 'All' ? true : prod.brand === selectedBrand;

    // 4. Price Match
    const matchesPrice = prod.price >= priceRange[0] && prod.price <= priceRange[1];

    // 5. Rating Match
    const matchesRating = prod.rating >= selectedRating;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
    // default/popularity
    return b.reviewsCount * b.rating - a.reviewsCount * a.rating;
  });

  const FilterSidebarContent = () => (
    <div className="space-y-6">
      
      {/* Category Select */}
      <div>
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Categories</h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${selectedCategory === cat ? 'bg-orange-50 text-[#FF6B00] dark:bg-zinc-900/50' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900/20 hover:text-gray-800'}`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <Check size={12} />}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Select */}
      <div>
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Brand</h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {brandsList.map(brand => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`w-full text-left py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${selectedBrand === brand ? 'bg-orange-50 text-[#FF6B00] dark:bg-zinc-900/50' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900/20 hover:text-gray-800'}`}
            >
              <span>{brand}</span>
              {selectedBrand === brand && <Check size={12} />}
            </button>
          ))}
        </div>
      </div>

      {/* Price filter slide */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Max Price</h4>
          <span className="text-xs font-extrabold text-[#FF6B00]">₹{priceRange[1].toLocaleString('en-IN')}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="50000" 
          step="500"
          value={priceRange[1]} 
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-orange-500 h-1 bg-gray-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1">
          <span>₹0</span>
          <span>₹50,000+</span>
        </div>
      </div>

      {/* Ratings Filter */}
      <div>
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Minimum Rating</h4>
        <div className="space-y-1">
          {[4, 3, 2, 0].map(rating => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`w-full text-left py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${selectedRating === rating ? 'bg-orange-50 text-[#FF6B00] dark:bg-zinc-900/50' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900/20'}`}
            >
              {rating === 0 ? 'Any Rating' : `${rating} Stars & Above`}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full py-2.5 border border-gray-200 dark:border-zinc-800 hover:border-orange-500 dark:hover:border-zinc-700 text-gray-500 dark:text-gray-400 hover:text-[#FF6B00] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <RefreshCw size={13} /> Reset Filters
      </button>

    </div>
  );

  return (
    <div id="ppb-products-page" className="bg-gray-50/50 dark:bg-zinc-950 min-h-screen pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* Page title and active status row */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-150 dark:border-zinc-800 pb-5 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {selectedCategory === 'All' ? 'PPBASKET Product Catalog' : `${selectedCategory} Store`}
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Showing <span className="text-[#FF6B00] font-bold">{sortedProducts.length}</span> products matching your search filters
            </p>
          </div>

          {/* Sorting and mobile filters buttons toolbar */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-orange-500 text-xs font-bold rounded-xl text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-all cursor-pointer"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>

            <div className="flex items-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl gap-2">
              <ArrowUpDown size={14} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-none"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Main Layout */}
        <div className="flex gap-8 items-start">
          
          {/* 1. Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-3xl shadow-sm sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <FilterSidebarContent />
          </aside>

          {/* 2. Product list grid */}
          <main className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-12 rounded-3xl shadow-sm text-center space-y-4 max-w-lg mx-auto mt-8">
                <div className="h-14 w-14 bg-orange-100 dark:bg-zinc-800 text-[#FF6B00] rounded-full flex items-center justify-center mx-auto text-xl font-bold">!</div>
                <h3 className="font-bold text-base text-gray-800 dark:text-white">No products found</h3>
                <p className="text-xs text-gray-400 leading-relaxed">No products match your current filters. Try resetting the price, selecting a different category, or updating your search query.</p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#FF6B00] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Drawer Filter modal overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}></div>
          <div className="relative w-4/5 max-w-xs bg-white dark:bg-zinc-950 p-6 shadow-2xl h-full overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-150 dark:border-zinc-900 mb-5">
                <h3 className="font-extrabold text-base text-gray-800 dark:text-white">Filter Products</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <FilterSidebarContent />
            </div>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full py-2.5 bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-bold rounded-xl"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

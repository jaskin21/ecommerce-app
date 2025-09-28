import { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import { useShopStore } from '../../stores/useProductStore';

const ShopFilter = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { filterProducts, resetFilters } = useShopStore();

  const [categories, setCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  useEffect(() => {
    console.log(categories, minRating, priceRange, onlyDiscounted);
  }, [categories, minRating, priceRange, onlyDiscounted]);

  // 🟢 Auto-apply filters when state changes
  useEffect(() => {
    filterProducts({
      categories,
      minRating,
      priceRange,
      onlyDiscounted,
    });
  }, [categories, minRating, priceRange, onlyDiscounted, filterProducts]);

  const toggleCategory = (cat: string) => {
    const value = cat.toLowerCase();
    if (categories.includes(value)) {
      setCategories(categories.filter((c) => c !== value));
    } else {
      setCategories([...categories, value]);
    }
  };

  const resetAll = () => {
    setCategories([]);
    setMinRating(undefined);
    setPriceRange([0, Infinity]);
    setMinInput('');
    setMaxInput('');
    setOnlyDiscounted(false);
    resetFilters();
  };

  const categoriesList = [
    "Men's Clothing",
    "Women's Clothing",
    'Jewelery',
    'Electronics',
  ];
  const ratingsRange = [5, 4, 3, 2, 1];

  return (
    <div className='w-full'>
      {/* ---------- Desktop Expanded Filters ---------- */}
      <div className='hidden md:block bg-white shadow-sm rounded-xl p-4 space-y-6'>
        {/* Title */}
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-800'>Filters</h2>
          {(categories.length > 0 ||
            minRating !== undefined ||
            priceRange[0] !== 0 ||
            priceRange[1] !== Infinity ||
            onlyDiscounted) && (
            <button
              className='text-sm text-slate-500 hover:text-red-500 transition-colors duration-200'
              onClick={resetAll}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Category */}
        <div>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>Category</h3>
          {categoriesList.map((cat) => (
            <label
              key={cat}
              className='flex items-center gap-2 py-1 cursor-pointer text-sm hover:text-blue-600 transition'
            >
              <input
                type='checkbox'
                className='rounded border-gray-300'
                onClick={() => toggleCategory(cat)}
                value={cat}
                checked={categories.includes(cat.toLowerCase())}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Discount */}
        <div>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>Discount</h3>
          <label className='flex items-center gap-2 py-1 cursor-pointer text-sm hover:text-blue-600 transition'>
            <input
              type='checkbox'
              checked={onlyDiscounted}
              onChange={() => setOnlyDiscounted(!onlyDiscounted)}
              className='rounded border-gray-300'
            />
            Has Discount
          </label>
        </div>

        {/* Price */}
        <div>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>Price</h3>
          <div className='flex items-center gap-3'>
            {/* Min */}
            <input
              type='number'
              placeholder='Min'
              value={minInput}
              className='border rounded-lg p-2 w-20 text-sm focus:ring-2 focus:ring-blue-500 outline-none'
              onChange={(e) => {
                setMinInput(e.target.value); // editable string
                setPriceRange([
                  e.target.value === '' ? 0 : Number(e.target.value),
                  priceRange[1],
                ]);
              }}
            />

            <span className='text-gray-400'>-</span>

            {/* Max */}
            <input
              type='number'
              placeholder='Max'
              value={maxInput}
              className='border rounded-lg p-2 w-20 text-sm focus:ring-2 focus:ring-blue-500 outline-none'
              onChange={(e) => {
                setMaxInput(e.target.value);
                setPriceRange([
                  priceRange[0],
                  e.target.value === '' ? Infinity : Number(e.target.value),
                ]);
              }}
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>Rating</h3>
          {ratingsRange.map((r) => (
            <label
              key={r}
              className='flex items-center gap-2 py-2 cursor-pointer text-sm hover:text-blue-600 transition'
            >
              <input
                type='checkbox'
                value={r}
                checked={minRating === r}
                onChange={() => {
                  if (minRating === r) {
                    setMinRating(undefined); // ✅ clicking again clears
                  } else {
                    setMinRating(r); // ✅ set new rating
                  }
                }}
                className='rounded border-gray-300'
              />
              <div className='flex items-center text-yellow-500'>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < r ? 'fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className='ml-2 text-gray-600 text-sm'>{r} & up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ---------- Mobile Toggle Filters ---------- */}
      <div className='md:hidden mt-4'>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className='w-full border px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition hover:bg-gray-50 border-gray-300'
        >
          <SlidersHorizontal size={16} /> Filters
        </button>

        {mobileOpen && (
          <div className='mt-3 bg-white shadow-xl rounded-xl p-4 space-y-4 animate-fadeIn'>
            {/* Category */}
            <div>
              <h3 className='text-sm font-medium text-gray-700 mb-2'>
                Category
              </h3>
              {categoriesList.map((cat) => (
                <label
                  key={cat}
                  className='flex items-center gap-2 py-1 cursor-pointer text-sm hover:text-blue-600 transition'
                >
                  <input
                    type='checkbox'
                    onClick={() => toggleCategory(cat)}
                    value={cat}
                    checked={categories.includes(cat.toLowerCase())}
                    onChange={() => toggleCategory(cat)}
                    className='rounded border-gray-300'
                  />
                  {cat}
                </label>
              ))}
            </div>

            {/* Discount */}
            <div>
              <h3 className='text-sm font-medium text-gray-700 mb-2'>
                Discount
              </h3>
              <label className='flex items-center gap-2 py-1 cursor-pointer text-sm hover:text-blue-600 transition'>
                <input
                  type='checkbox'
                  checked={onlyDiscounted}
                  onChange={() => setOnlyDiscounted(!onlyDiscounted)}
                  className='rounded border-gray-300'
                />
                Has Discount
              </label>
            </div>

            {/* Price */}
            <div>
              <h3 className='text-sm font-medium text-gray-700 mb-2'>Price</h3>
              <div className='flex items-center gap-3'>
                <input
                  type='number'
                  placeholder='Min'
                  value={minInput}
                  className='border rounded-lg p-2 w-20 text-sm focus:ring-2 focus:ring-blue-500 outline-none'
                  onChange={(e) => {
                    setMinInput(e.target.value); // editable string
                    setPriceRange([
                      e.target.value === '' ? 0 : Number(e.target.value),
                      priceRange[1],
                    ]);
                  }}
                />
                <span className='text-gray-400'>-</span>
                <input
                  type='number'
                  placeholder='Max'
                  value={maxInput}
                  className='border rounded-lg p-2 w-20 text-sm focus:ring-2 focus:ring-blue-500 outline-none'
                  onChange={(e) => {
                    setMaxInput(e.target.value);
                    setPriceRange([
                      priceRange[0],
                      e.target.value === '' ? Infinity : Number(e.target.value),
                    ]);
                  }}
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className='text-sm font-medium text-gray-700 mb-2'>Rating</h3>
              {ratingsRange.map((r) => (
                <label
                  key={r}
                  className='flex items-center gap-2 py-2 cursor-pointer text-sm hover:text-blue-600 transition'
                >
                  <input
                    type='radio'
                    name='rating-mobile'
                    value={r}
                    checked={minRating === r}
                    onChange={() => {
                      if (minRating === r) {
                        setMinRating(undefined); // ✅ clicking again clears
                      } else {
                        setMinRating(r); // ✅ set new rating
                      }
                    }}
                    className='rounded border-gray-300'
                  />
                  <div className='flex items-center text-yellow-500'>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < r ? 'fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className='ml-2 text-gray-600 text-sm'>{r} & up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopFilter;

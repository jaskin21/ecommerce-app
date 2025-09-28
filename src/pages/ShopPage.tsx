import ProductList from '../components/home/ProductList';
import ShopFilter from '../components/home/ShopFilter';

const ShopPage = () => {
  return (
    <div className='w-full lg:w-4/5 mx-auto flex flex-col md:flex-row gap-6 px-4 md:px-6 pt-6 pb-12'>
      {/* Left filter (fixed width on tablet & desktop) */}
      <div className='w-full md:w-[250px] flex-shrink-0'>
        <ShopFilter />
      </div>

      {/* Right products (auto adjusts) */}
      <div className='w-full flex-1'>
        <ProductList />
      </div>
    </div>
  );
};

export default ShopPage;

import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import DiscountedItemCarousel from '../components/home/DiscountedItemCarousel';
import PopularProduct from '../components/home/PopularProduct';
import DiscountCountdown from '../components/home/DiscountCountdown';

const HomePage = () => {
  const testimonials = [
    { text: '“A new industry standard.” - Entrepreneur' },
    { text: "“Just what your OB-GYN ordered.” - Harper's Bazaar" },
    { text: "“We're obsessed” - Glamour" },
    { text: '“My favorite underwear ... ever” - Vogue' },
  ];

  const customerReviews = [
    {
      review:
        "The softest, most breathable essentials I've ever worn—comfortable all day long!",
      name: 'Rebecca B.',
      status: 'Verified Customer',
      product: 'Organic Cotton High-Rise Thong',
      productLink: '#',
    },
    {
      review:
        'These are so much more comfortable and durable compared to other brands. Feels like you are wearing nothing.',
      name: 'Allison G.',
      status: 'Verified Customer',
      product: 'Organic Cotton Low-Rise Thong',
      productLink: '#',
    },
    {
      review:
        'Worth every penny! I love my JAS essentials — the mid-rise thong, bikini, and hipster. They stay put all day.',
      name: 'Jennifer D.',
      status: 'Verified Customer',
      product: 'Organic Cotton Mid-Rise Bikini',
      productLink: '#',
    },
    {
      review:
        'Super comfy and sustainable! I’ve switched all my basics to JAS Ecommerce.',
      name: 'Michael T.',
      status: 'Verified Customer',
      product: 'Organic Cotton Crew Tee',
      productLink: '#',
    },
    {
      review:
        'I was skeptical at first, but these are the only essentials I wear now. They last forever!',
      name: 'Sophia R.',
      status: 'Verified Customer',
      product: 'Organic Cotton Bodysuit',
      productLink: '#',
    },
    {
      review:
        "Quality is unmatched, and I love that it's eco-friendly. Highly recommend.",
      name: 'David P.',
      status: 'Verified Customer',
      product: 'Organic Cotton Hoodie',
      productLink: '#',
    },
  ];

  const [current, setCurrent] = useState(0);
  const reviewsPerSlide = 3; // Show 3 at a time
  const totalSlides = Math.ceil(customerReviews.length / reviewsPerSlide);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Full-Width Banner Image with Overlay Content */}
      <section className='relative w-full'>
        <img
          src='/images/home-banner.jpg'
          alt='About JAS Ecommerce'
          className='w-full h-[30rem] md:h-[47rem] object-cover'
        />

        {/* Centered Overlay Box */}
        <div className='absolute inset-0 flex items-center justify-center px-4'>
          <div className='bg-white bg-opacity-70 px-4 py-6 md:px-8 md:py-10 text-center rounded-md shadow-lg w-full max-w-md md:max-w-xl'>
            <h1 className='text-xl sm:text-2xl md:text-4xl font-thin mb-6'>
              Timeless Style, Naturally Made
            </h1>

            <button className='bg-gradient-to-r from-blue-500 to-indigo-600/40 text-white px-6 py-2 md:px-8 md:py-3 rounded-md shadow hover:opacity-90 transition mb-4 text-sm md:text-base'>
              SHOP SUSTAINABLE
            </button>

            <p className='text-gray-700 text-xs sm:text-sm md:text-base'>
              15K+ Orders Shipped Sustainably • Zero Compromise
            </p>
          </div>
        </div>
      </section>

      {/* Infinite Carousel */}
      <section className='w-full py-6 overflow-hidden'>
        <motion.div
          className='flex whitespace-nowrap'
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            ease: 'linear',
            duration: 25,
            repeat: Infinity,
          }}
        >
          {[...testimonials, ...testimonials].map((item, idx) => (
            <span key={idx} className='mx-12 text-lg font-medium text-gray-700'>
              {item.text}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Product List Section */}
      <DiscountedItemCarousel />

      {/* Countdown Timer Section */}
      <DiscountCountdown />
      
      {/* Popular Products Section */}
      <PopularProduct />

      {/* Testimonials Section */}
      <section className='max-w-6xl mx-auto px-6 py-16 text-center relative'>
        {/* Stars */}
        <div className='flex justify-center mb-4 text-yellow-500'>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className='mx-1' />
          ))}
        </div>

        {/* Title */}
        <h2 className='text-2xl md:text-3xl font-semibold mb-6'>
          Over 15,000 5-Star Reviews
        </h2>
        <hr className='border-t border-gray-300 w-1/3 mx-auto mb-10' />

        {/* Reviews Carousel */}
        <div className='overflow-hidden'>
          <div
            className='flex transition-transform duration-500 ease-in-out'
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className='grid grid-cols-1 md:grid-cols-3 gap-8 min-w-full'
              >
                {customerReviews
                  .slice(
                    slideIndex * reviewsPerSlide,
                    slideIndex * reviewsPerSlide + reviewsPerSlide
                  )
                  .map((review, index) => (
                    <div key={index} className='p-6 '>
                      <p className='italic text-gray-800 mb-4'>
                        " {review.review} "
                      </p>
                      <p className='font-medium'>{review.name}</p>
                      <p className='text-green-600 text-sm mb-2'>
                        ✔ {review.status}
                      </p>
                      <p className='text-sm'>
                        Reviewing:{' '}
                        <a
                          href={review.productLink}
                          className='underline hover:text-blue-600'
                        >
                          {review.product}
                        </a>
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-100'
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-100'
        >
          <FaChevronRight />
        </button>

        {/* Circle Indicators */}
        <div className='flex justify-center mt-6 space-x-2'>
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${
                current === i ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;

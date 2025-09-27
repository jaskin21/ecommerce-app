import { motion } from 'framer-motion';

const AboutPage = () => {
  const testimonials = [
    { text: '“A new industry standard.” - Entrepreneur' },
    { text: "“Just what your OB-GYN ordered.” - Harper's Bazaar" },
    { text: "“We're obsessed” - Glamour" },
    { text: '“My favorite underwear ... ever” - Vogue' },
  ];

  return (
    <>
      {/* Tagline Section */}
      <section className='bg-white py-20'>
        <div className='max-w-4xl mx-auto text-center px-6'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            Everyday Comfort, Elevated
          </h1>
          <p className='text-lg md:text-xl text-gray-600'>
            Timeless essentials crafted for comfort, designed with
            earth-friendly processes you can trust.
          </p>
        </div>
      </section>

      {/* Full-Width Banner Image */}
      <section className='w-full'>
        <img
          src='/images/about-banner.jpg'
          alt='About JAS Ecommerce'
          className='w-full h-[30rem] md:h-[40rem] object-cover'
        />
      </section>

      {/* Our Story Section */}
      <section className='max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center'>
        {/* Text Side */}
        <div>
          <h2 className='text-3xl font-bold mb-4'>Our Story</h2>
          <p className='text-lg leading-relaxed text-gray-700 mb-6'>
            At <strong>JAS Ecommerce</strong>, shopping isn’t just about buying
            products — it’s about discovering new trends, finding everyday
            essentials, and enjoying a smooth online experience. We provide a
            wide range of items, from the latest devices to stylish garments and
            lifestyle must-haves, all carefully selected to fit your needs.
          </p>
          <button className='bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition'>
            Shop Now
          </button>
        </div>

        {/* Image Side */}
        <div>
          <img
            src='/images/about-our-story.jpg'
            alt='Our Story'
            className='w-full h-96 object-cover rounded-lg shadow'
          />
        </div>
      </section>

      {/* Elevate Your Comfort Section */}
      <section className='max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center'>
        {/* Text Side (always first on mobile) */}
        <div className='md:order-2'>
          <h2 className='text-3xl font-bold mb-4'>Elevate Your Comfort</h2>
          <p className='text-lg leading-relaxed text-gray-700 mb-6'>
            Comfort isn’t just a luxury — it’s a necessity. That’s why we create
            products that feel good, look great, and fit seamlessly into your
            lifestyle. From everyday essentials to timeless pieces, our goal is
            to help you feel confident and comfortable every day.
          </p>
        </div>

        {/* Image Side (goes first on desktop, second on mobile) */}
        <div className='md:order-1'>
          <img
            src='/images/about-elevate-comfort.jpg'
            alt='Elevate Your Comfort'
            className='w-full h-96 object-cover rounded-lg shadow'
          />
        </div>
      </section>

      {/* Infinite Carousel */}
      <section className='w-full  py-6 overflow-hidden'>
        <motion.div
          className='flex whitespace-nowrap'
          animate={{ x: ['0%', '-100%'] }} // 👈 start visible at left edge
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
    </>
  );
};

export default AboutPage;

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DiscountCountdownHero = () => {
  // Fake sale ends in 7 days
  const saleEnd = new Date();
  const navigate = useNavigate();
  saleEnd.setDate(saleEnd.getDate() + 7);

  const calculateTimeLeft = () => {
    const diff = +saleEnd - +new Date();
    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div
        className='w-full h-96 flex items-center justify-center rounded-2xl bg-cover bg-center shadow-xl'
        style={{
          backgroundImage:
            'url(https://pagedone.io/asset/uploads/1710565658.jpg)',
        }}
      >
        <h2 className='text-white text-3xl font-bold'>🎉 Sale Ended</h2>
      </div>
    );
  }

  const boxes = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className='w-full h-[500px] flex flex-col gap-6 items-center justify-center 
                 bg-cover bg-center shadow-2xl relative overflow-hidden'
      style={{
        backgroundImage:
          'url(https://pagedone.io/asset/uploads/1710565658.jpg)',
      }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/40 backdrop-blur-sm'></div>

      {/* Content */}
      <div className='relative z-10 text-center'>
        <h2 className='text-6xl font-extrabold text-white drop-shadow-lg pb-5'>
          Up to <span className='text-red-400'>35% Off</span>
        </h2>
        <p className='text-2xl text-white/90 font-medium mt-2'>
          Mega Discount Ends Soon! Hurry Up 🚀
        </p>
      </div>

      {/* Countdown */}
      <div className='relative z-10 flex items-start justify-center gap-3'>
        {boxes.map((b, i) => (
          <div key={i} className='timer'>
            <div
              className='rounded-xl bg-black/30 backdrop-blur-sm py-3 min-w-[150px] 
                            flex items-center justify-center flex-col gap-1 px-3 shadow-md'
            >
              <h3 className='font-semibold text-7xl text-white text-center'>
                {b.value}
              </h3>
              <p className='text-sm uppercase text-white/80 mt-1 text-center w-full'>
                {b.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/shop')}
        className='relative z-10 mt-4 bg-red-500 text-white px-6 py-2 rounded-lg 
                   font-bold shadow-lg hover:bg-red-600'
      >
        Shop Now
      </motion.button>
    </motion.div>
  );
};

export default DiscountCountdownHero;

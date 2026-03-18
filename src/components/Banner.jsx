import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Because You Deserve Something Special.",
      subtitle: "PREMIUM COLLECTION",
      img: "https://admin.mumuso.com.bd/storage/111/conversions/01KJ20QFBFATCR1F7A1Q7WV35B-small.webp",
      color: "#f0fcf9",
    },
    {
      id: 2,
      title: "Freshness Redefined with Aloe Vera.",
      subtitle: "NATURAL SKINCARE",
      img: "https://admin.mumuso.com.bd/storage/114/conversions/01KJ20VS7F11TDV3Q8WG7WE91C-small.webp",
      color: "#f4f9f0",
    },
    {
      id: 3,
      title: "Smart Gadgets for Your Modern Life.",
      subtitle: "TECH & ELECTRONICS",
      img: "https://admin.mumuso.com.bd/storage/116/conversions/01KJ211FFR63J1EZXCHZWYNKCX-small.webp",
      color: "#f0f4fc",
    },
    {
      id: 4,
      title: "Organize Your Space with Style.",
      subtitle: "HOME LIFESTYLE",
      img: "https://admin.mumuso.com.bd/storage/118/conversions/01KJ213EZSGGWP3BKP37VD8D75-small.webp",
      color: "#fcfaf0",
    },
    {
      id: 5,
      title: "Express Yourself with Cute Stationeries.",
      subtitle: "CREATIVE OFFICE",
      img: "https://admin.mumuso.com.bd/storage/120/conversions/01KJ2167EVS8BS1M0GZW12HAD9-small.webp",
      color: "#fcf0f5",
    },
  ];

  return (
    <section className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-[600px] md:h-[650px] lg:h-[750px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full flex items-center transition-colors duration-1000"
              style={{ backgroundColor: slide.color }}
            >
              <div className="container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-center md:justify-between py-10 md:py-0">
                {/* Image Section - Mobile-e upore ar middle-e thakbe */}
                <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 relative mb-8 md:mb-0">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="absolute w-40 h-40 sm:w-64 sm:h-64 md:w-[450px] md:h-[450px] bg-white/60 rounded-full blur-3xl -z-10"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="relative"
                  >
                    <img
                      src={slide.img}
                      className="h-52 sm:h-64 md:h-[450px] lg:h-[500px] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.1)]"
                      alt="Mumuso Banner"
                    />

                    {/* Floating Info - Visible only on Desktop/Tablet */}
                    <motion.div
                      animate={{ y: [0, -15, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-5 -right-5 bg-white p-4 rounded-2xl shadow-2xl border border-gray-50 hidden md:block"
                    >
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                        New Trend
                      </p>
                      <p className="text-sm font-bold text-[#00a884]">
                        2026 Edition
                      </p>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Text Content - Mobile-e middle-e thakbe, Desktop-e left-e */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="text-[#00a884] font-black tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-3 md:mb-4 block uppercase">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-gray-900 leading-[1.2] md:leading-[1.1] mb-6 md:mb-10 max-w-xl">
                      {slide.title}
                    </h1>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 md:px-14 py-3.5 md:py-4 bg-[#00a884] text-white font-black rounded-full hover:bg-black transition-all shadow-xl shadow-teal-100 uppercase tracking-widest text-[11px] md:text-xs"
                    >
                      Explore Collection
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Rajesh Kumar",
    content: "WeBuildReach transformed our legacy CRM into a modern growth engine. Their technical depth and digital marketing insights are unmatched.",
    rating: 5,
  },
  {
    name: "Anjali Sharma",
    content: "The e-commerce platform WeBuildReach built for us saw a 40% increase in conversion within the first month. Highly recommended for scaling brands.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    content: "Expert handling of our School ERP project. The automation features have saved us hundreds of hours in administration.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    content: "Superb execution on our Real Estate portal. The map integration and filter search features are extremely fast and user-friendly.",
    rating: 5,
  },
  {
    name: "Pooja Mehta",
    content: "Our clinic saw a 3x increase in online bookings after WeBuildReach rebuilt our corporate site with optimized local SEO. Outstanding talent!",
    rating: 5,
  },
  {
    name: "Rahul Saxena",
    content: "Delivered a high-end UI/UX for our fintech SaaS product in record time. Their attention to micro-interactions and performance is stellar.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-8 bg-transparent overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-[30%] left-[-5%] w-[350px] h-[350px] bg-purple-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            CLIENT REVIEWS
          </span>
          <h2 className="text-slate-900 font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}>
            What Our Client Says
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            Read stories from founders and marketing managers who scaled their businesses with us.
          </p>
        </motion.div>

        {/* Carousel Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((test) => (
              <SwiperSlide key={test.name} className="h-auto">
                <div className="relative p-8 rounded-3xl bg-white border border-slate-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between h-full w-full">
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 italic">
                      "{test.content}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <div>
                      <h4 className="text-slate-900 font-extrabold text-base md:text-lg">{test.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">Verified Client</p>
                    </div>

                    {/* Google G Logo Icon */}
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: #5A45FD !important;
          opacity: 0.2;
        }
        .swiper-pagination-bullet-active {
          background: #5A45FD !important;
          opacity: 1;
          width: 24px !important;
          border-radius: 9999px !important;
          transition: width 0.3s ease;
        }
        .swiper {
          overflow: visible !important;
        }
        .swiper-wrapper {
          align-items: stretch;
        }
        .swiper-slide {
          height: auto !important;
          display: flex;
        }
      `}</style>
    </section>
  );
}

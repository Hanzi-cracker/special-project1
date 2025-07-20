import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { ArrowRight, Play, MapPin } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FullPageZoomSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // Destination data with high-quality images from public folder
  const destinations = [
    {
      id: 1,
      name: 'Dubai',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Futuristic Skylines',
      description: 'Experience luxury and innovation in the heart of the UAE',
      highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Desert Safari']
    },
    {
      id: 2,
      name: 'India',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      title: 'Timeless Heritage',
      description: 'Discover the monument of eternal love and rich culture',
      highlights: ['Taj Mahal', 'Red Fort', 'Golden Triangle']
    },
    {
      id: 3,
      name: 'China',
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Ancient Wonders',
      description: 'Walk through history on the Great Wall of China',
      highlights: ['Great Wall', 'Forbidden City', 'Terracotta Army']
    },
    {
      id: 4,
      name: 'Santorini',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      title: 'Aegean Paradise',
      description: 'Stunning sunsets and iconic blue-domed architecture',
      highlights: ['Oia Village', 'Red Beach', 'Wine Tasting']
    },
    {
      id: 5,
      name: 'Sydney',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Harbor City',
      description: 'Iconic landmarks and vibrant coastal lifestyle',
      highlights: ['Opera House', 'Harbor Bridge', 'Bondi Beach']
    },
    {
      id: 6,
      name: 'Malaysia',
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80',
      title: 'Twin Towers',
      description: 'Modern architecture meets cultural diversity',
      highlights: ['Petronas Towers', 'Batu Caves', 'Street Food']
    },
    {
      id: 7,
      name: 'Egypt',
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Pharaoh\'s Legacy',
      description: 'Uncover the mysteries of ancient civilizations',
      highlights: ['Pyramids of Giza', 'Sphinx', 'Nile Cruise']
    }
  ];

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden -mt-16 pt-16">
      {/* Glassmorphic Navigation Tabs */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
          {destinations.map((destination, index) => (
            <button
              key={destination.id}
              onClick={() => goToSlide(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-white/30 text-white shadow-lg scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/20'
              }`}
            >
              {destination.name}
            </button>
          ))}
        </div>
      </div>

      {/* Full-Page Swiper Slider */}
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {destinations.map((destination, index) => (
          <SwiperSlide key={destination.id}>
            <div className="relative h-full w-full">
              {/* Background Image with Zoom Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-[8000ms] ease-out"
                style={{
                  backgroundImage: `url(${destination.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  animation: index === activeIndex ? 'zoomIn 8s ease-out' : 'none'
                }}
              />
              
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pt-16">
        <div className="text-center text-white px-6 max-w-6xl mx-auto">
          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl font-light mb-3 text-white/95 drop-shadow-lg tracking-wide font-sans">
            Discover extraordinary destinations with
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-16 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg tracking-wider font-serif">
            Gakhar Enterprises
          </p>
          
          {/* Current Destination Info */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-4">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-medium">{destinations[activeIndex]?.name}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 font-serif tracking-wide">{destinations[activeIndex]?.title}</h2>
            <p className="text-base md:text-lg text-white/85 mb-6 font-sans leading-relaxed tracking-wide">{destinations[activeIndex]?.description}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {destinations[activeIndex]?.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/30 hover:border-white/50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/20">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Start Planning</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="group flex items-center space-x-2 px-6 py-3 text-white/80 hover:text-white transition-colors duration-300">
              <Play className="w-5 h-5" />
              <span className="text-lg font-medium">Watch Video</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-white'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullPageZoomSlider;

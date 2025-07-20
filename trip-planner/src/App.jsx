import { useState, useEffect } from "react";
import { saveTrip, loadTrips } from "./firebase";
import { signInWithGoogle, signOut, onAuthStateChange } from "./supabase";
import { Calendar, MapPin, Users, Clock, Star, ArrowRight, Globe, Sparkles, Camera, Heart, Plane, Mountain, Building, Waves, LogIn, LogOut, User } from "lucide-react";
import FullPageZoomSlider from './components/ZoomSlider';
import BottomNav from './components/BottomNav';

function App() {
  const [user, setUser] = useState(null);
  const [myTrips, setMyTrips] = useState([]);
  const [destination, setDestination] = useState("Tokyo");
  const [days, setDays] = useState(3);
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Destinations data
  const destinations = [
    {
      name: "Dubai",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Experience luxury and innovation in the heart of the UAE",
      price: "From $1,299"
    },
    {
      name: "India",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      description: "Discover the monument of eternal love and rich culture",
      price: "From $899"
    },
    {
      name: "China",
      image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Walk through history on the Great Wall of China",
      price: "From $1,199"
    },
    {
      name: "Santorini",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      description: "Stunning sunsets and iconic blue-domed architecture",
      price: "From $1,599"
    },
    {
      name: "Sydney",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Iconic landmarks and vibrant coastal lifestyle",
      price: "From $1,799"
    },
    {
      name: "Malaysia",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80",
      description: "Modern architecture meets cultural diversity",
      price: "From $999"
    }
  ];

  useEffect(() => {
    const { data: authListener } = onAuthStateChange((user) => {
      setUser(user);
      if (user) {
        loadUserTrips(user.id);
      } else {
        setMyTrips([]);
      }
    });

    return () => {
      if (authListener?.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setMyTrips([]);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const loadUserTrips = async (userId) => {
    try {
      const trips = await loadTrips(userId);
      setMyTrips(trips);
    } catch (error) {
      console.error('Error loading trips:', error);
    }
  };

  const handleSaveTrip = async () => {
    if (!user || !plan) return;
    
    try {
      await saveTrip(user.id, destination, days, plan);
      const trips = await loadTrips(user.id);
      setMyTrips(trips);
      alert('Trip saved successfully!');
    } catch (error) {
      console.error('Error saving trip:', error);
      alert('Failed to save trip. Please try again.');
    }
  };

  const handlePlanTrip = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    setPlan("");
    
    setTimeout(() => {
      const tripPlans = {
        'Tokyo': `🏯 **${days}-Day Tokyo Adventure**\n\n**Day 1**: Explore Shibuya Crossing, visit Meiji Shrine, and experience the vibrant nightlife in Shinjuku\n**Day 2**: Traditional culture at Senso-ji Temple, shopping in Harajuku, and sushi at Tsukiji Outer Market\n**Day 3**: Day trip to Mount Fuji or explore modern Tokyo in Ginza and Roppongi\n\n🍜 **Must-try**: Authentic ramen, tempura, and wagyu beef\n🎌 **Cultural tip**: Bow when greeting, remove shoes indoors`,
        'Dubai': `🏗️ **${days}-Day Dubai Luxury**\n\n**Day 1**: Burj Khalifa observation deck, Dubai Mall, and fountain show\n**Day 2**: Desert safari with camel riding and traditional BBQ dinner\n**Day 3**: Palm Jumeirah, Atlantis resort, and luxury beach time\n\n🛍️ **Shopping**: Gold Souk, spice markets, and designer boutiques\n🏖️ **Beaches**: Jumeirah Beach and private resort access`,
        'India': `🕌 **${days}-Day Golden Triangle**\n\n**Day 1**: Delhi - Red Fort, India Gate, and Chandni Chowk markets\n**Day 2**: Agra - Taj Mahal sunrise, Agra Fort, and local crafts\n**Day 3**: Jaipur - Amber Fort, City Palace, and pink city exploration\n\n🍛 **Cuisine**: Butter chicken, biryani, and street food tours\n🎨 **Culture**: Traditional dance, music, and handicraft workshops`,
        'Santorini': `🌅 **${days}-Day Greek Island Paradise**\n\n**Day 1**: Oia village sunset, blue-domed churches, and wine tasting\n**Day 2**: Red Beach, Akrotiri ruins, and traditional Greek tavernas\n**Day 3**: Fira town, cable car rides, and volcanic island cruise\n\n🍷 **Wine**: Local Assyrtiko varieties and vineyard tours\n🏖️ **Beaches**: Unique volcanic sand and crystal-clear waters`,
        'Sydney': `🏙️ **${days}-Day Harbor City Adventure**\n\n**Day 1**: Sydney Opera House tour, Harbor Bridge climb, and Circular Quay\n**Day 2**: Bondi Beach, coastal walk, and seafood at The Rocks\n**Day 3**: Blue Mountains day trip with scenic railway and bushwalking\n\n🏄 **Activities**: Surfing lessons, harbor cruises, and wildlife encounters\n☕ **Culture**: Coffee culture, street art, and local markets`,
        'Malaysia': `🏢 **${days}-Day Malaysian Discovery**\n\n**Day 1**: Kuala Lumpur - Petronas Towers, Batu Caves, and street food\n**Day 2**: Penang - George Town heritage, hawker centers, and temples\n**Day 3**: Langkawi - beaches, mangrove tours, and duty-free shopping\n\n🍜 **Food**: Nasi lemak, char kway teow, and tropical fruits\n🌴 **Nature**: Rainforest canopy walks and island hopping`
      };
      
      const plan = tripPlans[destination] || `✨ **${days}-Day ${destination} Adventure**\n\nYour personalized itinerary includes:\n• Cultural landmarks and hidden gems\n• Local cuisine recommendations\n• Unique experiences and activities\n• Transportation and accommodation tips\n\nThis beautiful destination offers unforgettable memories waiting to be made!`;
      
      setPlan(plan);
      
      if (user) {
        saveTrip(user.uid, destination, days, plan).then(() => {
          loadTrips(user.uid).then(setMyTrips);
        });
      }
      
      setLoading(false);
    }, 2500);
  };

  const handleDestinationClick = (destName) => {
    setDestination(destName);
    document.getElementById('trip-planner')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openTripModal = (trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const closeTripModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-300 hover:bg-black/20">
        <nav className="px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/logo/gakhar.jpg" 
                  alt="Gakhar Enterprises Logo" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-500"
                />
              </div>
              <span className="text-2xl font-bold text-white font-serif tracking-wide">Gakhar Enterprises</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="text-gray-300 hover:text-purple-400 transition-colors font-sans flex items-center space-x-1"
                  >
                    <span className="text-sm">{social}</span>
                  </a>
                ))}
              </div>
              {user ? (
                <div className="flex items-center space-x-2">
                  <img 
                    src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&background=random`}
                    alt={user.email} 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{user.email}</span>
                  <button 
                    onClick={handleSignOut}
                    className="text-sm text-gray-300 hover:text-white flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleSignIn}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In with Google
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Full-Page Hero Section with Advanced Zoom Slider */}
      <div className="relative z-0">
        <FullPageZoomSlider />
      </div>

      {/* Featured Trips Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif tracking-wide">
              🧭 Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Trips</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-sans leading-relaxed tracking-wide">
              Curated adventures designed by travel experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <div 
                key={dest.name} 
                className="group relative overflow-hidden rounded-2xl glass border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 cursor-pointer"
                onClick={() => handleDestinationClick(dest.name)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 font-serif tracking-wide">{dest.name}</h3>
                  <p className="text-gray-300 mb-6 font-sans leading-relaxed tracking-wide">{dest.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-semibold">{dest.price}</span>
                    <button className="glass hover:bg-white/30 px-4 py-2 rounded-full text-white font-medium transition-all duration-300 hover:scale-105">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Your Journey Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif tracking-wide">
              🧳 Plan Your <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-sans leading-relaxed tracking-wide">
              Simple steps to create your perfect adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Destination',
                description: 'Select from our curated list of amazing destinations worldwide',
                icon: '🌍'
              },
              {
                step: '02',
                title: 'Customize Trip',
                description: 'Personalize your itinerary with AI-powered recommendations',
                icon: '✨'
              },
              {
                step: '03',
                title: 'Book & Travel',
                description: 'Secure your bookings and embark on your dream adventure',
                icon: '✈️'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="glass rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                  <div className="text-6xl mb-6 text-center">{item.icon}</div>
                  <div className="text-4xl font-bold text-blue-400 mb-6 text-center font-serif">{item.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-6 text-center font-serif tracking-wide">{item.title}</h3>
                  <p className="text-gray-300 text-center leading-relaxed font-sans tracking-wide">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white/30">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Trip Planner */}
      <section id="trip-planner" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-wide">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Plan Your Perfect Trip
              </span>
            </h2>
            <p className="text-gray-400 text-lg font-sans">Let AI create your personalized adventure</p>
          </div>
          
          <div className="glass rounded-3xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 font-sans">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors font-sans"
                    placeholder="Where do you want to go?"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 font-sans">Duration (Days)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors font-sans"
                    placeholder="How many days?"
                  />
                </div>
              </div>
            </div>
            
            <button
              onClick={handlePlanTrip}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 font-sans"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating Your Adventure...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Trip Plan
                </>
              )}
            </button>
            
            {plan && (
              <div className="mt-6 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
                <h3 className="text-lg font-semibold mb-2 text-purple-300 font-serif">Your AI-Generated Trip Plan</h3>
                <div className="text-gray-300 font-sans leading-relaxed whitespace-pre-line">{plan}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* My Trips Section */}
      {user && myTrips.length > 0 && (
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-wide">
                <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  My Saved Trips
                </span>
              </h2>
              <p className="text-gray-400 text-lg font-sans">Your personalized travel collection</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTrips.map((trip, index) => (
                <div 
                  key={index}
                  onClick={() => openTripModal(trip)}
                  className="glass rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <h3 className="text-xl font-bold mb-2 text-green-300 font-serif">{trip.destination}</h3>
                  <p className="text-gray-400 text-sm mb-4 font-sans">{trip.days} days • Created {new Date(trip.createdAt).toLocaleDateString()}</p>
                  <p className="text-gray-300 line-clamp-3 font-sans">{trip.plan.substring(0, 150)}...</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 relative z-10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo/gakhar.jpg" 
                  alt="Gakhar Enterprises Logo" 
                  className="w-8 h-8 rounded-full object-cover border-2 border-amber-500"
                />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-serif">
                  Gakhar Enterprises
                </h3>
              </div>
              <p className="text-gray-400 mt-2 font-sans">© 2025 Gakhar Enterprises. Your Gateway to the World.</p>
            </div>
            <div className="flex space-x-6">
              {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-purple-400 transition-colors font-sans">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Trip Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl p-8 max-w-2xl w-full border border-white/20">
            {selectedTrip && (
              <>
                <h3 className="text-2xl font-bold mb-4 text-purple-300 font-serif">{selectedTrip.destination}</h3>
                <div className="text-gray-300 mb-6 font-sans leading-relaxed whitespace-pre-line">{selectedTrip.plan}</div>
                <button
                  onClick={closeTripModal}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 font-sans"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Sticky Glassmorphic Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default App;

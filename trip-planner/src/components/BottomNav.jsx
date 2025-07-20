import { Home, Compass, Map, User } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Compass, label: 'Explore', active: false },
    { icon: Map, label: 'Map', active: false },
    { icon: User, label: 'Profile', active: false }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-black/80 backdrop-blur-sm border-t border-white/30 px-4 py-3 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-all duration-300 ${
                  item.active
                    ? 'text-blue-400 bg-white/30 scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                <IconComponent className="w-6 h-6" />
                <span className="text-xs font-medium font-sans tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;

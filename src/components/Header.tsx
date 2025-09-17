import React from 'react';
import { Moon, Sun, ChefHat } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, currentSection, setCurrentSection }) => {
  const menuItems = ['Home', 'Food', 'Order Now'];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      darkMode ? 'bg-gray-900/95 text-white' : 'bg-white/95 text-gray-800'
    } backdrop-blur-sm shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${darkMode ? 'bg-orange-600' : 'bg-orange-500'}`}>
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                The Contraband Kitchen
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Swad Jo rules tode
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentSection(item)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  currentSection === item
                    ? darkMode
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-orange-500 text-white shadow-lg'
                    : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-2">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentSection(item)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentSection === item
                    ? darkMode
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-500 text-white'
                    : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
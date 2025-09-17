import React from 'react';
import { Clock, MapPin, Phone, Star } from 'lucide-react';

interface HomeProps {
  darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  const features = [
    { icon: Clock, title: 'Quick Service', desc: 'Fresh food delivered in 30 minutes' },
    { icon: MapPin, title: 'Local Delivery', desc: 'Serving your neighborhood with love' },
    { icon: Phone, title: '24/7 Support', desc: 'Always here to serve you better' },
    { icon: Star, title: 'Quality Food', desc: 'Made with finest ingredients' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              The Contraband Kitchen
            </h1>
            <p className={`text-2xl md:text-3xl font-semibold mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Swad Jo rules tode
            </p>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Experience the authentic taste of homemade food with our carefully crafted dishes. 
              From traditional Indian cuisine to modern fusion, we serve happiness on every plate.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl">
              Order Now
            </button>
            <button className={`px-8 py-4 rounded-full font-semibold text-lg border-2 transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}>
              View Menu
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  darkMode ? 'bg-gray-900 hover:bg-gray-700' : 'bg-gray-50 hover:bg-white'
                }`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Our Story
          </h2>
          <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Born from a passion for authentic flavors and a desire to bring homestyle cooking to your doorstep, 
            The Contraband Kitchen started as a dream to serve food that tastes like home. Every dish is prepared 
            with love, using traditional recipes passed down through generations and the freshest ingredients.
          </p>
          <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Whether you're craving comfort food like Maggi and Pav Bhaji or looking for something more elaborate 
            like our signature Chicken Curry, we've got something for everyone. Our motto "Swad Jo rules tode" 
            reflects our commitment to flavors that break all the rules and create new standards of deliciousness.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
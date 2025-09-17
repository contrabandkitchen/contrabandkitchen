import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Food, { CartItem } from './components/Food';
import Order from './components/Order';
import Cart from './components/Cart';
import { ShoppingCart } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSection, setCurrentSection] = useState('Home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Auto dark mode based on time
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      const isDarkTime = hour >= 18 || hour < 6; // Dark mode from 6 PM to 6 AM
      
      // Only auto-toggle if user hasn't manually set preference
      const userPreference = localStorage.getItem('darkModePreference');
      if (!userPreference) {
        setDarkMode(isDarkTime);
      } else {
        setDarkMode(userPreference === 'dark');
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkModePreference', newDarkMode ? 'dark' : 'light');
  };

  const addToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        item => item.name === newItem.name
      );
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      } else {
        // Add new item to cart
        return [...prevCart, newItem];
      }
    });
    
    // Show cart briefly when item is added
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 2000);
  };

  const updateCartItem = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = quantity;
      return updatedCart;
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'Home':
        return <Home darkMode={darkMode} />;
      case 'Food':
        return <Food darkMode={darkMode} addToCart={addToCart} cart={cart} />;
      case 'Order Now':
        return <Order darkMode={darkMode} />;
      default:
        return <Home darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <Header 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      
      <main className="transition-all duration-300">
        {renderCurrentSection()}
      </main>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-40"
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {getTotalItems()}
            </span>
          </div>
        </button>
      )}

      {/* Cart Sidebar */}
      <Cart
        darkMode={darkMode}
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        updateCartItem={updateCartItem}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      {/* Footer */}
      <footer className={`py-8 px-4 border-t ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-600'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-4">
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              The Contraband Kitchen
            </h3>
            <p className="text-sm">Swad Jo rules tode</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Delivery Hours:</strong><br />
              10:00 AM - 11:00 PM
            </div>
            <div>
              <strong>Contact:</strong><br />
              WhatsApp: +91 91052 89551
            </div>
            <div>
              <strong>Email:</strong><br />
              orders@contrabandkitchen.com
            </div>
          </div>
          <div className={`mt-6 pt-4 border-t text-xs ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            © 2025 The Contraband Kitchen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
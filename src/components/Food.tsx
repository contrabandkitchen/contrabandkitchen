import React, { useState } from 'react';
import { Leaf, Drumstick, Plus, Minus, ShoppingCart } from 'lucide-react';

interface FoodProps {
  darkMode: boolean;
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
}

interface MenuItem {
  name: string;
  price: number | { half?: number; full?: number; small?: number; large?: number };
  isVeg: boolean;
  description?: string;
  popular?: boolean;
}

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  isVeg: boolean;
}

const Food: React.FC<FoodProps> = ({ darkMode, addToCart, cart }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [selectedVariants, setSelectedVariants] = useState<{[key: string]: string}>({});

  const menuItems: MenuItem[] = [
    // Maggi Items
    { name: 'Plain Maggi', price: 35, isVeg: true, description: 'Simple and classic Maggi noodles' },
    { name: 'Veg Maggi', price: 49, isVeg: true, description: 'Loaded with fresh vegetables', popular: true },
    { name: 'Egg Maggi', price: 65, isVeg: false, description: 'Maggi with perfectly cooked eggs' },
    
    // Bhurji Items
    { name: 'Paneer Bhurji', price: 119, isVeg: true, description: 'Scrambled cottage cheese with spices', popular: true },
    { name: 'Egg Bhurji', price: 159, isVeg: false, description: 'Spiced scrambled eggs with onions' },
    
    // Chicken Items
    { name: 'Chicken Lollipop', price: { half: 199, full: 349 }, isVeg: false, description: '4 pieces (Half) / 8 pieces (Full)', popular: true },
    { name: 'Chicken Curry', price: { half: 219, full: 379 }, isVeg: false, description: 'Rich and flavorful chicken curry' },
    
    // Curry Items
    { name: 'Egg Curry', price: 189, isVeg: false, description: 'Boiled eggs in spicy gravy' },
    { name: 'Aloo Jeera', price: 79, isVeg: true, description: 'Cumin flavored potatoes' },
    
    // Rice & Sabji
    { name: 'Fried Rice', price: 79, isVeg: true, description: 'Aromatic fried rice with vegetables' },
    { name: 'Bhindi Sabji', price: 119, isVeg: true, description: 'Traditional okra curry' },
    { name: 'Kurkuri Bhindi', price: 169, isVeg: true, description: 'Crispy fried okra', popular: true },
    
    // Bread Rolls
    { name: 'Bread Rolls', price: { small: 129, large: 199 }, isVeg: true, description: '4 pieces / 6 pieces' },
    { name: 'Cheese Bread Rolls', price: { small: 159, large: 249 }, isVeg: true, description: '4 pieces / 6 pieces' },
    
    // Snacks
    { name: 'Aloo Pakode', price: 59, isVeg: true, description: '8 pieces of crispy potato fritters' },
    { name: 'Cheese Aloo Sandwich', price: 89, isVeg: true, description: 'Grilled sandwich with cheese and potatoes' },
    { name: 'Pav Bhaji', price: 99, isVeg: true, description: 'Mumbai street food special', popular: true },
    
    // Momos
    { name: 'Veg Momos', price: { small: 79, large: 139 }, isVeg: true, description: '4 pieces / 8 pieces' },
    { name: 'Non Veg Momos', price: { small: 119, large: 189 }, isVeg: false, description: '4 pieces / 8 pieces', popular: true },
  ];

  const filteredItems = menuItems.filter(item => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'veg') return item.isVeg;
    if (activeCategory === 'nonveg') return !item.isVeg;
    return true;
  });

  const formatPrice = (price: number | { half?: number; full?: number; small?: number; large?: number }) => {
    if (typeof price === 'number') {
      return `₹${price}`;
    }
    
    if (price.half && price.full) {
      return `₹${price.half} (Half) / ₹${price.full} (Full)`;
    }
    
    if (price.small && price.large) {
      return `₹${price.small} (4pcs) / ₹${price.large} (6pcs)`;
    }
    
    return '₹--';
  };

  const updateQuantity = (itemName: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemName]: Math.max(0, (prev[itemName] || 0) + change)
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.name] || 1;
    const variant = selectedVariants[item.name];
    
    let price: number;
    let variantText = '';
    
    if (typeof item.price === 'number') {
      price = item.price;
    } else {
      if (variant === 'half' && item.price.half) {
        price = item.price.half;
        variantText = ' (Half)';
      } else if (variant === 'full' && item.price.full) {
        price = item.price.full;
        variantText = ' (Full)';
      } else if (variant === 'small' && item.price.small) {
        price = item.price.small;
        variantText = ' (4pcs)';
      } else if (variant === 'large' && item.price.large) {
        price = item.price.large;
        variantText = ' (6pcs)';
      } else {
        // Default to first available option
        if (item.price.half) {
          price = item.price.half;
          variantText = ' (Half)';
        } else if (item.price.small) {
          price = item.price.small;
          variantText = ' (4pcs)';
        } else {
          price = 0;
        }
      }
    }

    const cartItem: CartItem = {
      name: item.name + variantText,
      price,
      quantity,
      variant: variantText,
      isVeg: item.isVeg
    };

    addToCart(cartItem);
    
    // Reset quantity after adding to cart
    setQuantities(prev => ({
      ...prev,
      [item.name]: 0
    }));
  };

  const hasVariants = (price: MenuItem['price']) => {
    return typeof price === 'object' && (price.half || price.small);
  };

  return (
    <div className={`min-h-screen py-12 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Our Menu
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover our delicious range of homemade favorites
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: 'all', label: 'All Items', icon: null },
            { key: 'veg', label: 'Vegetarian', icon: Leaf },
            { key: 'nonveg', label: 'Non-Vegetarian', icon: Drumstick },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                activeCategory === key
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {item.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Popular
                </div>
              )}

              {/* Veg/Non-veg Indicator */}
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
                  item.isVeg ? 'border-green-500' : 'border-red-500'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    item.isVeg ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                </div>
                <span className={`text-xs font-medium ${
                  item.isVeg 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>
              </div>

              {/* Item Details */}
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {item.name}
              </h3>
              
              {item.description && (
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              )}

              <div className="flex justify-between items-center">
                <span className={`text-lg font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {formatPrice(item.price)}
                </span>
                
                <div className="flex flex-col gap-2">
                  {/* Variant Selection */}
                  {hasVariants(item.price) && (
                    <div className="flex gap-2">
                      {typeof item.price === 'object' && item.price.half && (
                        <button
                          onClick={() => setSelectedVariants(prev => ({...prev, [item.name]: 'half'}))}
                          className={`px-2 py-1 text-xs rounded ${
                            selectedVariants[item.name] === 'half' || !selectedVariants[item.name]
                              ? 'bg-orange-500 text-white'
                              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          Half
                        </button>
                      )}
                      {typeof item.price === 'object' && item.price.full && (
                        <button
                          onClick={() => setSelectedVariants(prev => ({...prev, [item.name]: 'full'}))}
                          className={`px-2 py-1 text-xs rounded ${
                            selectedVariants[item.name] === 'full'
                              ? 'bg-orange-500 text-white'
                              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          Full
                        </button>
                      )}
                      {typeof item.price === 'object' && item.price.small && (
                        <button
                          onClick={() => setSelectedVariants(prev => ({...prev, [item.name]: 'small'}))}
                          className={`px-2 py-1 text-xs rounded ${
                            selectedVariants[item.name] === 'small' || !selectedVariants[item.name]
                              ? 'bg-orange-500 text-white'
                              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          4pcs
                        </button>
                      )}
                      {typeof item.price === 'object' && item.price.large && (
                        <button
                          onClick={() => setSelectedVariants(prev => ({...prev, [item.name]: 'large'}))}
                          className={`px-2 py-1 text-xs rounded ${
                            selectedVariants[item.name] === 'large'
                              ? 'bg-orange-500 text-white'
                              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          6pcs
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* Quantity and Add to Cart */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.name, -1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
                        } hover:scale-110 transition-transform`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className={`w-8 text-center font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {quantities[item.name] || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.name, 1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
                        } hover:scale-110 transition-transform`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-2 rounded-lg font-medium hover:scale-105 transition-transform duration-300 shadow-md text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No items found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Food;
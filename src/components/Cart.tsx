import React from 'react';
import { X, ShoppingCart, MessageCircle, Trash2 } from 'lucide-react';
import { CartItem } from './Food';

interface CartProps {
  darkMode: boolean;
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  updateCartItem: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  darkMode, 
  cart, 
  isOpen, 
  onClose, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
}) => {
  const whatsappNumber = '919105289551';
  
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleOrderNow = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    let orderText = 'Hi! I would like to place an order:\n\n';
    cart.forEach((item, index) => {
      orderText += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    orderText += `\nTotal: ₹${getTotalPrice()}`;
    orderText += '\n\nPlease confirm the order and delivery details.';

    const message = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md transform transition-transform ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-xl`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-2">
            <ShoppingCart className={`h-5 w-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Your Order ({cart.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 max-h-96">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className={`h-12 w-12 mx-auto mb-4 ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Your cart is empty
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${
                          item.isVeg ? 'border-green-500' : 'border-red-500'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            item.isVeg ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {item.name}
                        </h3>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                        ₹{item.price} each
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className={`p-1 rounded hover:bg-red-100 ${
                        darkMode ? 'text-red-400 hover:bg-red-900' : 'text-red-600'
                      }`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartItem(index, item.quantity - 1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'
                        } hover:scale-110 transition-transform`}
                      >
                        -
                      </button>
                      <span className={`w-8 text-center font-medium ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartItem(index, item.quantity + 1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'
                        } hover:scale-110 transition-transform`}
                      >
                        +
                      </button>
                    </div>
                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Total: ₹{getTotalPrice()}
              </span>
              <button
                onClick={clearCart}
                className={`text-sm px-3 py-1 rounded ${
                  darkMode ? 'text-red-400 hover:bg-red-900' : 'text-red-600 hover:bg-red-50'
                }`}
              >
                Clear Cart
              </button>
            </div>
            
            <button
              onClick={handleOrderNow}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
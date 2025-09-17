import React, { useState } from 'react';
import { MessageCircle, Send, Star, Phone, MapPin } from 'lucide-react';

interface OrderProps {
  darkMode: boolean;
}

const Order: React.FC<OrderProps> = ({ darkMode }) => {
  const [orderText, setOrderText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const whatsappNumber = '919105289551'; // Main WhatsApp number
  const whatsappNumber2 = '917232906627'; // Alternative WhatsApp number

  const handleOrderSubmit = (phoneNumber: string) => {
    if (!orderText.trim()) {
      alert('Please enter your order details');
      return;
    }

    const message = encodeURIComponent(`Hi! I would like to place an order:\n\n${orderText}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      alert('Please enter your feedback');
      return;
    }

    setIsSubmittingFeedback(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback,
          rating,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        alert('Thank you for your feedback! We appreciate it.');
        setFeedback('');
        setRating(0);
      } else {
        alert('There was an error submitting your feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Order Now
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Place your order directly through WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Section */}
          <div className={`p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Place Your Order
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Order Details
                </label>
                <textarea
                  value={orderText}
                  onChange={(e) => setOrderText(e.target.value)}
                  placeholder="Enter your order details here... (e.g., 1x Veg Maggi, 2x Chicken Lollipop Half, 1x Pav Bhaji)"
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Contact Us on WhatsApp
                </h3>
                
                <button
                  onClick={() => handleOrderSubmit(whatsappNumber)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <Phone className="h-5 w-5" />
                  Order via WhatsApp - Main
                </button>
                
                <button
                  onClick={() => handleOrderSubmit(whatsappNumber2)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <Phone className="h-5 w-5" />
                  Order via WhatsApp - Alternative
                </button>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-orange-50'} border-l-4 border-orange-500`}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <span className={`font-medium ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                    Delivery Info
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  We deliver fresh, hot food in 30-45 minutes. Minimum order value may apply.
                  Please include your complete address and contact number in your WhatsApp message.
                </p>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className={`p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full">
                <Send className="h-6 w-6 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Share Your Feedback
              </h2>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Rate Your Experience
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                        star <= rating ? 'text-yellow-400' : darkMode ? 'text-gray-600' : 'text-gray-300'
                      }`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience, suggestions, or any issues you faced..."
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingFeedback}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <Send className="h-5 w-5" />
                {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>

            <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border-l-4 border-blue-500`}>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                💡 <strong>Tip:</strong> Your feedback helps us improve our service and food quality. 
                We read every message and work constantly to serve you better!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
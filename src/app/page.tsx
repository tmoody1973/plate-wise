import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PlateWise - Home',
  description: 'Welcome to PlateWise - Your culturally-aware meal planning companion',
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-orange-500 font-display">PlateWise</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Recipes</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Meal Plans</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Budget</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">About</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-display leading-tight">
                <span className="text-orange-500">Smart</span> and{' '}
                <span className="text-orange-500">Cultural</span><br />
                Meal Planning with a<br />
                <span className="text-orange-500">Budget</span> Focus
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover authentic recipes from your heritage, optimize your grocery budget, 
                and plan meals that honor your cultural traditions with AI-powered assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors">
                  Start Planning
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-orange-500 hover:text-orange-500 transition-colors">
                  View Recipes
                </button>
              </div>
            </div>

            {/* Right Content - Food Circle */}
            <div className="relative">
              <div className="w-96 h-96 mx-auto relative">
                {/* Main circular container */}
                <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-4 bg-white rounded-full shadow-lg"></div>
                  
                  {/* Food items positioned around the circle */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-2xl">🍛</span>
                  </div>
                  <div className="absolute top-1/4 right-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-2xl">🥘</span>
                  </div>
                  <div className="absolute bottom-1/4 right-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-2xl">🍜</span>
                  </div>
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-2xl">🥗</span>
                  </div>
                  <div className="absolute bottom-1/4 left-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-2xl">🍲</span>
                  </div>
                  <div className="absolute top-1/4 left-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-2xl">🥙</span>
                  </div>
                  
                  {/* Center content */}
                  <div className="relative z-10 text-center">
                    <span className="text-4xl mb-2 block">🍽️</span>
                    <p className="text-sm font-semibold text-gray-700">Cultural Recipes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Why Choose <span className="text-orange-500">PlateWise</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Combining cultural authenticity with smart budget management for your family's meals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Smart Planning</h3>
              <p className="text-gray-600">AI-powered meal planning that adapts to your cultural preferences and budget constraints.</p>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Cultural Recipes</h3>
              <p className="text-gray-600">Authentic recipes from your heritage, adapted for modern kitchens and dietary needs.</p>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Budget Optimization</h3>
              <p className="text-gray-600">Smart shopping lists and price comparisons to maximize your grocery budget.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-display">
              Featured <span className="text-orange-500">Cultural</span> Recipes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover authentic recipes from around the world, carefully adapted for your budget and dietary preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Recipe Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <span className="text-6xl">🍛</span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-orange-500">
                  ⭐ 4.8 (127)
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Mediterranean Paella</h3>
                <p className="text-gray-600 text-sm mb-4">Traditional Spanish rice dish with saffron, vegetables, and authentic spices</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>🕒 45 min</span>
                  <span>👥 4 servings</span>
                  <span>💰 Budget-friendly</span>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>

            {/* Recipe Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <span className="text-6xl">🥘</span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-orange-500">
                  ⭐ 4.9 (203)
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Indian Biryani</h3>
                <p className="text-gray-600 text-sm mb-4">Aromatic basmati rice with tender meat and traditional Indian spices</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>🕒 60 min</span>
                  <span>👥 6 servings</span>
                  <span>💰 Moderate cost</span>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>

            {/* Recipe Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                  <span className="text-6xl">🍜</span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-orange-500">
                  ⭐ 4.7 (89)
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Japanese Ramen</h3>
                <p className="text-gray-600 text-sm mb-4">Rich tonkotsu broth with fresh noodles and traditional toppings</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>🕒 90 min</span>
                  <span>👥 2 servings</span>
                  <span>💰 Moderate cost</span>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Recipe Card 4 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                  <span className="text-6xl">🌮</span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-orange-500">
                  ⭐ 4.6 (156)
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Mexican Tacos</h3>
                <p className="text-gray-600 text-sm mb-4">Authentic corn tortillas with seasoned meat and fresh salsa</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>🕒 30 min</span>
                  <span>👥 4 servings</span>
                  <span>💰 Budget-friendly</span>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>

            {/* Recipe Card 5 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <span className="text-6xl">🍲</span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-orange-500">
                  ⭐ 4.8 (92)
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Moroccan Tagine</h3>
                <p className="text-gray-600 text-sm mb-4">Slow-cooked stew with aromatic spices and tender vegetables</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>🕒 120 min</span>
                  <span>👥 6 servings</span>
                  <span>💰 Moderate cost</span>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>

            {/* Recipe Card 6 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-6xl">🥙</span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-orange-500">
                  ⭐ 4.7 (134)
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Greek Gyros</h3>
                <p className="text-gray-600 text-sm mb-4">Warm pita bread with seasoned meat and traditional tzatziki</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>🕒 25 min</span>
                  <span>👥 3 servings</span>
                  <span>💰 Budget-friendly</span>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              How <span className="text-orange-500">PlateWise</span> Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to start your culturally-aware meal planning journey
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl p-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">1</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">Set Your Preferences</h3>
                <p className="text-gray-700 mb-4">Tell us about your cultural background, dietary needs, and budget goals</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Cultural cuisine preferences</li>
                  <li>• Dietary restrictions & allergies</li>
                  <li>• Weekly/monthly budget limits</li>
                </ul>
              </div>
              <div className="absolute top-4 right-4 text-6xl opacity-20">⚙️</div>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 text-gray-900 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">2</div>
                <h3 className="text-2xl font-bold mb-2 font-display">Get AI-Powered Plans</h3>
                <p className="text-gray-700 mb-4">Receive personalized meal plans that honor your traditions while optimizing costs</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Authentic cultural recipes</li>
                  <li>• Smart grocery shopping lists</li>
                  <li>• Budget-optimized meal suggestions</li>
                </ul>
              </div>
              <div className="absolute top-4 right-4 text-6xl opacity-20">🤖</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">PlateWise</h3>
              <p className="text-gray-600 mb-4">
                Your culturally-aware meal planning platform that helps optimize food budgets while preserving culinary traditions.
              </p>
              <div className="flex space-x-4">
                <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">📱</span>
                <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">📧</span>
                <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">🐦</span>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 font-display">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-orange-500">Recipe Library</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500">Meal Planning</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500">Budget Tracking</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500">Cultural Cuisines</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 font-display">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-orange-500">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500">How It Works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500">Cultural Guide</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500">Help Center</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 font-display">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-500">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-600">
              © 2024 PlateWise. All rights reserved. | 
              <span className="text-orange-500 font-semibold"> Currently in Development</span> - 
              Stay tuned for the full experience!
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
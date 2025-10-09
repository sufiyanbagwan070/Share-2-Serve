import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import FoodForm from "./components/FoodForm";
import FoodList from "./components/foodlist";
import AvailableFood from "./components/AvailableFood";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";



function App() {
  const [foods, setFoods] = useState(() => {
    try {
      const stored = localStorage.getItem('foods');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save foods to localStorage whenever foods changes
  useEffect(() => {
    try {
      localStorage.setItem('foods', JSON.stringify(foods));
    } catch {}
  }, [foods]);

  // Add new food entry
  const addFood = (food) => {
    setFoods([...foods, { ...food, id: Date.now(), status: "Available" }]);
  };

  // Delete all food data (clear storage and state)
  const deleteAllFood = () => {
    setFoods([]);
    try {
      localStorage.removeItem('foods');
    } catch {}
  };

  // Mark food as booked
  const bookFood = (id) => {
    setFoods(
      foods.map((f) => (f.id === id ? { ...f, status: "Booked" } : f))
    );
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home page: Upload food + list */}
        <Route
          path="/"
          element={
            <div className="p-6">
              <Header />
              <div className="container mt-6">
                <FoodList foods={foods} bookFood={bookFood} />
              </div>
            </div>
          }
        />

        {/* Order page: Food list */}
        <Route
          path="/order"
          element={
            <div className="p-6">
              <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
                🍽️ Order Food
              </h2>
              <div className="container mt-6">
                <button onClick={deleteAllFood} style={{marginBottom: '1rem', background: '#b62222', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer'}}>Delete All Food Data</button>
                <FoodList foods={foods} bookFood={bookFood} />
              </div>
            </div>
          }
        />

        {/* Available food for users */}
        <Route
          path="/request"
          element={
            <div className="p-6">
              <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
                🍛 Available Food Nearby
              </h2>
              <AvailableFood foods={foods} bookFood={bookFood} />
            </div>
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <div className="p-6">
              <section className="about">
                <h2>About Share2Serve</h2>
                <p>
                  Share2Serve is a community-driven platform that connects restaurants,
                  events, offices, and households with nearby people and organizations
                  who can make immediate use of surplus food. Our mission is simple:
                  reduce food waste and ensure more people get a nutritious meal.
                </p>
                <div className="about-grid">
                  <div className="about-card">
                    <h3>Reduce Waste</h3>
                    <p>Every year tons of edible food is discarded. We aim to turn
                    leftovers into opportunities to feed people in need.</p>
                  </div>
                  <div className="about-card">
                    <h3>Serve Nearby</h3>
                    <p>We surface meals available nearby in real-time so helpers can
                    quickly pick up and serve their community.</p>
                  </div>
                  <div className="about-card">
                    <h3>Safe & Simple</h3>
                    <p>Clear info about dish, quantity, and location makes coordination
                    easy. Food status helps avoid double-booking.</p>
                  </div>
                </div>

                <div className="about-cta">
                  <h3>How you can help</h3>
                  <ul>
                    <li>List surplus meals after events or daily prep.</li>
                    <li>Pick up available meals and deliver to people nearby.</li>
                    <li>Share the app and grow the local network.</li>
                  </ul>
                </div>
              </section>
            </div>
          }
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <div className="p-6">
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p>Email: support@share2serve.com</p>
            </div>
          }
        />

        {/* Submit food only */}
        <Route
          path="/submit-food"
          element={
            <div className="p-6">
              <h2 className="text-3xl font-bold page-title">🍴 Submit Food</h2>
              <FoodForm addFood={addFood} />
            </div>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

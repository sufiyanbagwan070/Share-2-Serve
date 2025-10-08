import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import FoodForm from "./components/FoodForm";
import FoodList from "./components/foodlist";
import AvailableFood from "./components/AvailableFood";
import Navbar from "./components/Navbar";
import "./App.css";
 
// Cookie helpers
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}



function App() {
  const [foods, setFoods] = useState([]);

  // Load foods from cookie on mount
  useEffect(() => {
    const cookieData = getCookie('foods');
    if (cookieData) {
      try {
        setFoods(JSON.parse(cookieData));
      } catch {
        // Ignore JSON parse errors
      }
    }
  }, []);

  // Save foods to cookie whenever foods changes
  useEffect(() => {
    setCookie('foods', JSON.stringify(foods));
  }, [foods]);

  // Add new food entry
  const addFood = (food) => {
    setFoods([...foods, { ...food, id: Date.now(), status: "Available" }]);
  };

  // Delete all food data (clear cookie and state)
  const deleteAllFood = () => {
    setFoods([]);
    deleteCookie('foods');
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
              <h2 className="text-3xl font-bold">About Us</h2>
              <p>We connect restaurants and donors with people in need of food.</p>
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
              <h2 className="text-3xl font-bold">🍴 Submit Food</h2>
              <FoodForm addFood={addFood} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

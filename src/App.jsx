import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import FoodForm from "./components/FoodForm";
import FoodList from "./components/FoodList";
import AvailableFood from "./components/AvailableFood";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [foods, setFoods] = useState([]);

  // Add new food entry
  const addFood = (food) => {
    setFoods([...foods, { ...food, id: Date.now(), status: "Available" }]);
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
        {/* Page 1: Upload food + list */}
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

        {/* Page 2: Available food for users */}
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

        {/* Page 3: About */}
        <Route
          path="/about"
          element={
            <div className="p-6">
              <h2 className="text-3xl font-bold">About Us</h2>
              <p>We connect restaurants and donors with people in need of food.</p>
            </div>
          }
        />

        {/* Page 4: Contact */}
        <Route
          path="/contact"
          element={
            <div className="p-6">
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p>Email: support@share2serve.com</p>
            </div>
          }
        />

        {/* Page 5: Submit food only */}
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

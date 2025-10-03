import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import FoodForm from "./components/FoodForm";
import FoodList from "./components/FoodList";
import AvailableFood from "./components/AvailableFood";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [foods, setFoods] = useState([
   ]);

  // Add new food entry
  const addFood = (food) => {
    setFoods([...foods, { ...food, id: Date.now(), status: "Available" }]);
  };

  // Mark food as booked
  const bookFood = (id) => {
    setFoods(
      foods.map((f) =>
        f.id === id ? { ...f, status: "Booked" } : f
      )
    );
  };

  return (
    <>
      <Navbar/>
    <Router>
      {/* Navbar */}
      
    

      {/* Routes */}
      <Routes>
        {/* Page 1: Upload food */}
        <Route
          path="/"
          element={
            <div className="p-6">
              <Header />
              <div className="container mt-6">
                <FoodForm addFood={addFood} />
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
      </Routes>
    </Router>
    </>
  );
}

export default App;

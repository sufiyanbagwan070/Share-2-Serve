import { useState } from "react";

const FoodForm = ({ addFood }) => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodName || !quantity || !location) return;
    addFood({ foodName, quantity, location });
    setFoodName("");
    setQuantity("");
    setLocation("");
  };

  return (
    <form className="food-form" onSubmit={handleSubmit}>
      <h2>Donate Food</h2>
      <input
        type="text"
        placeholder="Food Name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity (people can eat)"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Upload Food</button>
    </form>
  );
};

export default FoodForm;

const FoodList = ({ foods, bookFood }) => {
  console.log("Rendering FoodList with foods:", foods);
  
  return (
    <div className="food-list">
      <h2>Available Food</h2>
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(foods) && foods.length > 0 ? (
            foods.map((food) => (
              <tr key={food.id}>
                <td>{food.foodName}</td>
                <td>{food.quantity}</td>
                <td>{food.location}</td>
                <td
                  className={
                    food.status === "Booked" ? "status booked" : "status available"
                  }
                >
                  {food.status}
                </td>
                <td>
                  {food.status === "Available" ? (
                    <button onClick={() => bookFood(food.id)}>Accept</button>
                  ) : (
                    <button disabled>Booked</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default FoodList;

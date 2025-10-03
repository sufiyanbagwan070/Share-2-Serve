const FoodList = ({ foods, bookFood }) => {
  return (
    <div className="food-list">
      <h2>Available Food</h2>
      {foods.length === 0 ? (
        <p>No food available yet.</p>
      ) : (
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
            {foods.map((food) => (
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FoodList;

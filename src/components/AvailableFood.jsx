import React from "react";

function AvailableFood({ foods, bookFood }) {
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
          🍛 Available Food Nearby
        </h2>
        {foods.length === 0 ? (
          <p className="text-center text-gray-500">No food available right now ❌</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-100">
                <th className="border p-3">Food</th>
                <th className="border p-3">Type</th>
                <th className="border p-3">People</th>
                <th className="border p-3">Location</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((f) => (
                <tr key={f.id} className="text-center hover:bg-gray-50">
                  <td className="border p-3">{f.name}</td>
                  <td className="border p-3">{f.type}</td>
                  <td className="border p-3">{f.people}</td>
                  <td className="border p-3">{f.location}</td>
                  <td
                    className={`border p-3 font-semibold ${
                      f.status === "Booked" ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {f.status}
                  </td>
                  <td className="border p-3">
                    {f.status === "Available" ? (
                      <button
                        onClick={() => bookFood(f.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        ✅ Accept Food
                      </button>
                    ) : (
                      <span className="text-gray-400">Already Booked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AvailableFood;

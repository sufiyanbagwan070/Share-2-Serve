import { useEffect, useMemo, useRef, useState } from "react";

const FoodForm = ({ addFood }) => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({ foodName: "", quantity: "", location: "" });
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [coords, setCoords] = useState(null);
  const controllerRef = useRef(null);

  const validate = () => {
    const nextErrors = { foodName: "", quantity: "", location: "" };
    const trimmedName = foodName.trim();
    const trimmedLocation = location.trim();
    const parsedQuantity = Number(quantity);

    if (trimmedName.length < 2) {
      nextErrors.foodName = "Please enter a food name (min 2 characters).";
    }
    if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      nextErrors.quantity = "Quantity must be a positive number.";
    }
    if (trimmedLocation.length < 2) {
      nextErrors.location = "Please enter a location (min 2 characters).";
    }

    setErrors(nextErrors);
    return !nextErrors.foodName && !nextErrors.quantity && !nextErrors.location;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addFood({ foodName: foodName.trim(), quantity: Number(quantity), location: location.trim() });
    setFoodName("");
    setQuantity("");
    setLocation("");
    setShowToast(true);
    setShowModal(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const closeModal = () => setShowModal(false);

  // Try to get user's current coordinates for nearby bias
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => {},
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 600000 }
    );
  }, []);

  // Debounced location search using OpenStreetMap Nominatim
  useEffect(() => {
    const query = location.trim();
    if (!query) {
      setSuggestions([]);
      return;
    }
    const timeoutId = setTimeout(async () => {
      try {
        if (controllerRef.current) controllerRef.current.abort();
        controllerRef.current = new AbortController();
        setIsLoadingSuggestions(true);
        const params = new URLSearchParams({
          q: query,
          format: "json",
          addressdetails: "1",
          limit: "5",
        });
        // If we have coordinates, pass them to bias results
        if (coords) {
          // Use viewbox around coordinates to bias results
          const delta = 0.2; // approx ~20km radius
          params.set("viewbox", `${coords.lon - delta},${coords.lat + delta},${coords.lon + delta},${coords.lat - delta}`);
          params.set("bounded", "1");
        }
        const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
        const res = await fetch(url, {
          headers: { "Accept": "application/json" },
          signal: controllerRef.current.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch suggestions");
        const data = await res.json();
        const mapped = data.map((d) => ({ id: d.place_id, label: d.display_name }));
        setSuggestions(mapped);
      } catch (e) {
        if (e.name !== "AbortError") setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [location, coords]);

  const onSuggestionClick = (label) => {
    setLocation(label);
    setSuggestions([]);
  };

  return (
    <>
      <form className="food-form" onSubmit={handleSubmit} noValidate>
        <h2>Donate Food</h2>
        <div>
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className={errors.foodName ? "input-error" : ""}
            aria-invalid={!!errors.foodName}
          />
          {errors.foodName && <div className="error-text">{errors.foodName}</div>}
        </div>
        <div>
          <input
            type="number"
            placeholder="Quantity (people can eat)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={errors.quantity ? "input-error" : ""}
            aria-invalid={!!errors.quantity}
          />
          {errors.quantity && <div className="error-text">{errors.quantity}</div>}
        </div>
        <div className="autocomplete">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={errors.location ? "input-error" : ""}
            aria-invalid={!!errors.location}
            aria-autocomplete="list"
            autoComplete="off"
          />
          {errors.location && <div className="error-text">{errors.location}</div>}
          {(isLoadingSuggestions || suggestions.length > 0) && (
            <div className="autocomplete-list">
              {isLoadingSuggestions && <div className="autocomplete-item muted">Searching…</div>}
              {suggestions.map((s) => (
                <div key={s.id} className="autocomplete-item" onClick={() => onSuggestionClick(s.label)}>
                  {s.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit">Upload Food</button>
      </form>

      {showToast && (
        <div className="toast toast-success" role="status">Food uploaded successfully</div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Success</h3>
            <p>Your food has been uploaded and is now visible in the list.</p>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodForm;

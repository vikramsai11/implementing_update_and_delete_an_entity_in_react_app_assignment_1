import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [item, setItem] = useState(null);
  const [doorId, setDoorId] = useState(1); // Default to door ID 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URI}/${doorId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching door data:", error);
      }
    };

    fetchData();
  }, [doorId]); // Refetch when doorId changes

  return (
    <div>
      <h1>Update Door Information</h1>
      {item ? <UpdateItem item={item} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
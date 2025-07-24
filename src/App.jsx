import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/Home";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, [limit]);

  return (
    <Routes>
      <Route path="/" element={<HomePage 
        loading={loading}
        error={error}
        coins={coins}
        filter={filter}
        setFilter={setFilter}
        limit={limit}
        setLimit={setLimit}
      />} />
    </Routes>
  )
}

export default App;

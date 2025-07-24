import { Link, useParams } from "react-router"
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_COIN_API_URL;

function CoinDetailsPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error ("Failed to fetch data");
        const data = await response.json();
        setCoin(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoin();
  }, [id]);

  return (
    <div className="coin-details-container">
      <Link to="/">Back to Home</Link>
      <h1 className="coin-details-title">
        { coin ? `${coin.name} (${coin.symbol})` : 'Coin Details' }
      </h1>
      { loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />
          <p>{coin.description.en.split(". ")[0] + "."}</p>
          <div className="coin-details info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>Current Price: $
              {coin.market_data.current_price.usd.toLocaleString('en-US')}
            </h3>
            <h4>
              Market Cap: $
              {coin.market_data.market_cap.usd.toLocaleString('en-US')}
            </h4>
          </div>
        </>
      )}
    </div>
  )
}

export default CoinDetailsPage
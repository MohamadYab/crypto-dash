import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
} from "chart.js";
import "chartjs-adapter-date-fns";
import Spinner from "./Spinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

function CoinChart({ coinId }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(`${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`);
        if (!response.ok) throw new Error ("Failed to fetch data");
        const data = await response.json();
        const prices = data.prices.map((price) => {
          return {
            x: price[0],
            y: price[1],
          }
        })
        setChartData({
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              fill: false,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              pointRadius: 0,
              tension: 0.3
            }
          ]
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, [coinId]);

  if (loading) return <Spinner />
  if (error) return <div className="error">{error}</div>

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false }
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day"
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7
              }
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString("en-US")}`
              }
            }
          }
        }}
      />
    </div>
  )
}

export default CoinChart
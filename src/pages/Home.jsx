import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import Spinner from "../components/Spinner";

function HomePage({
  loading,
  error,
  coins,
  filter,
  setFilter,
  limit,
  setLimit
}) {

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
  });

  return (
    <div>
      <h1>Crypto Dash</h1>
      {
        loading ? (
          <Spinner />
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <div className="top-controls">
              <FilterInput
                placeholder=""
                value={filter}
                onChange={setFilter}
              />
              <LimitSelector limit={limit} onChange={setLimit} />
            </div>
            <main className="grid">
              { filteredCoins.length > 0 ? (
                  filteredCoins.map((coin) => (
                    <CoinCard key={coin.id} coin={coin} />
                  ))
              ) : (
                <p>No Matching Coins</p>
              )}
            </main>
          </>
        )
      }
    </div>
  )
}

export default HomePage
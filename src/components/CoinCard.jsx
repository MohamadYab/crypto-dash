import React from 'react'

function CoinCard({ coin }) {
  return (
    <div
      className="coin-card"
    >
      <div className="coin-header">
        <img src={coin.image} alt={coin.name} className="coin-image" />
        <div>
          <h2>{coin.name}</h2>
          <p className="symbol">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <p>Price: ${coin.current_price.toLocaleString('en-US')}</p>
      <p
        className={
          coin.price_change_percentage_24h >= 0
            ? 'positice'
            : 'negative'
        }
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
      <p>Market Cap: {coin.market_cap.toLocaleString('en-US')}</p>
    </div>
  )
}

export default CoinCard
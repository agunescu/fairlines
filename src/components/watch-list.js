import React, { useContext } from 'react';
import { GlobalContext } from "../context/global-provider";

const WatchlistView = () => {
  const { state } = useContext(GlobalContext);
  const fares = state.selectedFares;

  return (
    <div className="fa-ul-main">
      <div className="fa-ul-header">Manage your fare alerts</div>
      <div className="fa-ul-list">You can change your settings or unsubscribe from your alerts:
        {fares && fares.length > 0 &&
          <div>
            {fares.map((item, i) => (
                <div key={i} className="fa-ul-item">
                  <div className="fa-ul-title">New York (JFK) to {state.selectedCountry}</div>
                  <div>{item.travelfromuntil} | Price (USD): {item.price}</div>
                </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default WatchlistView;
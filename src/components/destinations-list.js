import React, { useEffect, useRef, useContext } from 'react';
import { loadFares } from '../context/fares-reducer';
import { GlobalContext } from '../context/global-provider';
import { SET_FARES, ADD_TO_WATCHLIST } from "../context/types";

const filterCountries = (arr, code) =>
  arr.filter(item => item.destcountrycode === code);

const renderFares = (fares, callback) =>
  fares.map((fare, i) => {
    const text = fare.travelclasstext;

    return (
      <div
        key={i}
        className={`${text === 'Economy' ? 'fa-class' : 'fa-class-b'}`}
      >
        <div
          className={`${
            text === 'Economy' ? 'fa-class-text' : 'fa-class-text-b'
          }`}
        >
          {fare.travelclasstext}
        </div>
        <div className="fa-class-from">From</div>
        <div className="fa-class-price">{fare.price}</div>
        <div className="fa-class-currency">{fare.currencycode}</div>
        <div className="fa-class-fu-text">
          For travel between
          <span className="fa-class-fu">{fare.travelfromuntil}</span>
        </div>
        <div className="fa-class-expiry">
          Fare expires in {fare.expiryindays} day(s)
        </div>
        <input
          className="fa-input fa-class-input"
          name="From"
          defaultValue={`${fare.travelfrom} - ${fare.traveluntil}`}
        />
        <div className="fa-buttons">
          <button className="fa-class-button" type="button" onClick={() => {}}>
            Search for Flights
          </button>
          <button className="fa-class-button-w" type="button" onClick={() => callback(fare)}>
            Watch this fare
          </button>
        </div>
      </div>
    );
  });

const renderCards = (state, fn) => {
  const { fares, selectedCountry } = state;
  const data = filterCountries(fares, selectedCountry);
  console.log('data', data);

  if (data.length === 0) {
    return <div>No data available for this destination.</div>;
  }

  return (
    <div className="fa-fares">
      {data.map((item, i) => (
        <div key={i} className="fa-fares-item">
          <img src={data[0].image} alt="" className="img-responsive" />
          <div className="fa-top-pick">Our top picks</div>
          {renderFares(item.fares, fn)}
        </div>
      ))}
    </div>
  );
};

const DestinationsList = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const isInitialMount = useRef(true);

  useEffect(
    function() {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else if (state.showFares) {
        (async () => {
          try {
            const data = await loadFares(state.selectedCountry);
            dispatch({
              type: SET_FARES,
              payload: data.farecards.cards,
            });
          } catch (error) {
            console.log(error);
          }
        })();
      }
    },
    [state.showFares]
  );

  const addToWatchlist = selectedFares => {
    if (state.selectedCountry) {
      dispatch({
        type: ADD_TO_WATCHLIST,
        payload: selectedFares,
      });
    }
  };

  return (
    <div className="fa-cards">
      {state.showFares && (
        <div className="fa-list">
          <h2 className="fa-header">Our top picks from New York (JFK)</h2>
          <div>
            {state.fares.length > 0 ? renderCards(state, addToWatchlist) : 'Loading...'}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationsList;

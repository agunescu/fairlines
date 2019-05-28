import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoSSR from 'react-no-ssr';
import Select from 'react-select';
import { SET_COUNTRY, SHOW_FARES } from '../context/types';
import { GlobalContext } from '../context/global-provider';

const customStyles = {
  control: provided => ({
    ...provided,
    fontSize: '20px',
    fontFamily: 'HelveticaNeue-Medium, sans-serif',
    lineHeight: '23px',
    fontWeight: '400',
    color: '#333',
    background: '#fff',
    boxShadow: 'inset 4px 4px 0 0 #f6f6f6',
    borderRadius: '.3rem',
    border: '1px solid #666',
    padding: '6px 0',
    outline: 0,
    marginBottom: '10px',
  }),
};

// Custom hook!
const useCountries = function() {
  const [countries, setCountries] = useState([]);

  useEffect(function() {
    (async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      const data = await res.json();
      setCountries(data);
    })();
  }, []);

  return countries;
};

const mapCountries = function(countries) {
  return countries.map(country => ({
    value: country.alpha2Code,
    label: country.name,
  }));
};

export default function DestinationForm() {
  const countries = useCountries();
  const { state, dispatch } = useContext(GlobalContext);

  const showFares = show => {
    if (state.selectedCountry) {
      dispatch({
        type: SHOW_FARES,
        payload: show,
      });
    }
  };

  const setCountry = country => {
    dispatch({
      type: SET_COUNTRY,
      payload: country,
    });
  };

  return (
    <div className="future-airlines">
      <p className="fa-text">
        Find the best deal for Future Air flights. Featured Fares lists all our
        current flight specials. Bookmark this page and check back often for
        specials flight offers.
      </p>
      <input className="fa-input" name="From" defaultValue="New York (JFK)" />
      <NoSSR>
        <Select
          styles={customStyles}
          options={mapCountries(countries)}
          onChange={selectedOption => setCountry(selectedOption)}
        />
      </NoSSR>
      <button
        className="fa-button"
        type="button"
        onClick={() => showFares(true)}
      >
        Search
      </button>
      <Link to="/watchlist">Manage watchlist</Link>
    </div>
  );
}

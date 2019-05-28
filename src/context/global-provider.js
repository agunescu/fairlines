/**
 * Create a GlobalContext that takes the initialState and
 * export the GlobalProvider and GlobalContext
 */

import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { FaresReducer } from './fares-reducer';

const initialState = {
  countries: [],
  selectedCountry: '',
  showFares: false,
  fares: [],
  selectedFares: [],
};

const GlobalContext = React.createContext(initialState);

const GlobalProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(FaresReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GlobalContext, GlobalProvider, initialState };

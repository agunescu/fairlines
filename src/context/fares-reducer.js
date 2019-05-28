import { SET_FARES, SET_COUNTRY, SHOW_FARES, ADD_TO_WATCHLIST } from './types';

export const loadFares = async () => {
  try {
    let res = await fetch(`https://www.emirates.com/api/en-us/fares`);
    res = await res.json();
    console.log('Loading fares...', res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const showFares = (show, state) => ({
  ...state,
  showFares: show,
});

const setCountry = (country, state) => ({
  ...state,
  selectedCountry: country.value,
});

const setFares = (fares, state) => ({
  ...state,
  fares,
});

const addToWatchlist = (data, state) => ({
  ...state,
  watchlist: data,
});

export const FaresReducer = (state, action) => {
  switch (action.type) {
    case SHOW_FARES:
      return showFares(action.payload, state);
    case SET_COUNTRY:
      return setCountry(action.payload, state);
    case SET_FARES:
      return setFares(action.payload, state);
    case ADD_TO_WATCHLIST:
      return addToWatchlist(action.payload, state);
    default:
      return state;
  }
};

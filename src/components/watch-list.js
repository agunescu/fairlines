import React, { useContext } from 'react';
import { GlobalContext } from "../context/global-provider";

const WatchlistView = () => {
  const { state, dispatch } = useContext(GlobalContext);

  console.log('Stateeee', state);

  return (
    <div>Manage your fare alerts: {state.selectedFares[0]}</div>
  );
};

export default WatchlistView;
import React from 'react';
import './App.css';
import { GlobalProvider } from './context/global-provider';
import DestinationsForm from './components/destinations-form';
import DestinationsList from './components/destinations-list';

const App = () => (
    <GlobalProvider>
      <div className="fa-main-ct">
        <DestinationsForm />
        <DestinationsList />
      </div>
    </GlobalProvider>
);

export default App;
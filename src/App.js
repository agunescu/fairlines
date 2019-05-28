import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { GlobalProvider } from './context/global-provider';
import WatchlistView from "./components/watch-list";
import {Main} from "./components/main";

const App = () => (
    <GlobalProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/watchlist' component={WatchlistView}/>
        </Switch>
      </Router>
    </GlobalProvider>
);

export default App;
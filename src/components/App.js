import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import CocktailsPageContainer from '../containers/CocktailsPageContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Boozer</h2>
          <Link to='/cocktails'>See All Cocktails</Link>
          <Link to='/'>Home</Link>
        </div>
        <Route path="/cocktails" component={CocktailsPageContainer} />
      </div>
    );
  }
}

export default App;

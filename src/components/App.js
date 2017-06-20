import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import CocktailsPageContainer from '../containers/CocktailsPageContainer'
import LoginForm from './LoginForm'

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: {
        isLoggedIn: false,
        user: {}
      }
    }

    this.logIn = this.logIn.bind(this)
  }

componentDidMount() {
  if(localStorage.getItem('user_id')) {
    fetch('http://localhost:3000/api/v1/current_user', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('user_id')
      }
    })
    .then(res => res.json())
    .then(user => this.setState({
      auth: {
        isLoggedIn: true,
        user: user
      }
    }))
  }
}

logIn(loginParms) {
  fetch('http://localhost:3000/api/v1/auth', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('user_id')
    },
    body: JSON.stringify(loginParms)
  }).then(res => res.json())
  .then(user => {
    if (!user.error) {
      this.setState({
        auth: {
          isLoggedIn: true,
          user: user
        }
      })
      localStorage.setItem('user_id', user.id)
    }
  })

}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Boozer {this.state.auth.user.username}</h2>
          <Link to='/cocktails'>See All Cocktails</Link>
          <Link to='/'>Home</Link>
          <Link to='/login'>Log In</Link>
        </div>
        <Route path="/cocktails" component={CocktailsPageContainer} />
        <Route path="/login" render={() => <LoginForm onSubmit={this.logIn} />} />
      </div>
    );
  }
}

export default App;

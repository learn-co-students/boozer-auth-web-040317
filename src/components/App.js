import React, {Component} from 'react';
import {Route, Link, withRouter} from 'react-router-dom'

import CocktailsPageContainer from '../containers/CocktailsPageContainer'
import LoginForm from './LoginForm'
import withAuth from '../hocs/withAuth'
import {AuthAdapter} from '../adapters'

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
    if (localStorage.getItem('jwt')) {
      AuthAdapter.currentUser().then(user => this.setState({
        auth: {
          isLoggedIn: true,
          user: user
        }
      }))
    }
  }

  logIn(loginParams) {
    AuthAdapter.logIn(loginParams).then(user => {
      if (!user.error) {
        this.setState({
          auth: {
            isLoggedIn: true,
            user: user
          }
        })
        localStorage.setItem('jwt', user.jwt)
      }
    })
  }

  handleClick = e => {
    e.preventDefault();
    localStorage.clear()
    this.setState({
      auth: {
        isLoggedIn: false,
        user: {}
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
          <button onClick={this.handleClick}>Logout</button>
        </div>
        <Route path="/cocktails" render={() => <CocktailsPageContainer loggedIn={this.state.auth.isLoggedIn}/>}/>
        <Route path="/login" render={() => <LoginForm logIn={this.logIn}/>}/>
      </div>
    );
  }
}

export default withAuth(App);

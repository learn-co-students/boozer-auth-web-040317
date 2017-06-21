import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import CocktailsPageContainer from '../containers/CocktailsPageContainer'
import LoginForm from './LoginForm'
import {AuthAdapter} from '../adapters'

class App extends Component {

  constructor(){
    super()
    this.state = {
      auth: {
        isLoggedIn: false,
        user: {}
      }
    }
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  logIn(loginParams){
    AuthAdapter.login(loginParams)
    .then(user => {
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

  logOut(){
    this.setState({
      auth: { isLoggedIn: false, user: {} }
    })
    localStorage.clear()
  }

  componentDidMount(){
    if (localStorage.getItem('jwt')){
      AuthAdapter.currentUser()
      .then(user => {
        this.setState({
          auth: { isLoggedIn: true, user: user }
        })
      })
    }
  }

  render() {
    let name
    if (this.state.auth.isLoggedIn){
      name = this.state.auth.user.username
    } else {
      name = null
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to {name} Boozer</h2>
          <Link to='/cocktails'>See All Cocktails</Link>
          <Link to='/'>Home</Link>
          <Link to='/login'>Log In</Link>
          <Route path='/login' render={() => < LoginForm onSubmit={this.logIn}/>} />
          <button onClick={this.logOut}>Log Out</button>
        </div>
        <Route path="/cocktails" component={CocktailsPageContainer} />
      </div>
    );
  }
}

export default App;

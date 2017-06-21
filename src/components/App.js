import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { AuthAdapter } from '../adapters'
import LoginForm from './LoginForm'

import CocktailsPageContainer from '../containers/CocktailsPageContainer'

class App extends Component {
  constructor(){
    super()
    this.state = {
      auth: {
        isLoggedIn: false,
        loggedInUser: {}
      }
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    if (localStorage.getItem('jwt')){
      AuthAdapter.currentUser()
        .then(user => {
          if (!user.error){
            this.setState({
              auth: {
                isLoggedIn: true,
                user: user
              }
            })
          }
        })
    }
  }

  login(loginParams){
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

  logout(routerProps){
    localStorage.clear()
    routerProps.history.push('/')
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
          <h2>Welcome to Boozer</h2>
          {this.state.auth.isLoggedIn ? <Link to='/cocktails'>See All Cocktails</Link> : null}<br />
          {this.state.auth.isLoggedIn ? <Link to='/logout'>Logout</Link> : <Link to='/login'>Login</Link>}<br />
          <Link to='/'>Home</Link><br/>
          <Route path='/login' render={() => <LoginForm onSubmit={this.login} />} />
          <Route path='/logout' render={(routerProps) => <div>{this.logout(routerProps)}</div> } />
        </div>
        <Route path="/cocktails" component={CocktailsPageContainer} />
      </div>
    );
  }
}

export default App;

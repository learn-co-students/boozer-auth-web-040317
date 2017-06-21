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
    this.loggedInDisplay = this.loggedInDisplay.bind(this)
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

  login(loginParams, history){
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
          history.push('/')
        }
      })
  }

  logout(){
    localStorage.clear()
    this.setState({
      auth: {
        isLoggedIn: false,
        user: {}
      }
    })
  }

  loggedInDisplay(){
    if (this.state.auth.isLoggedIn) {
      return (
        <div>
          <Link to='/cocktails'>See All Cocktails</Link><br/>
          <Link to='/' onClick={this.logout}>Logout</Link><br/>
        </div>
      )
    } else {
      return (
        <div>
          <Link to='/login'>Login</Link><br/>
          <Route path='/login' render={(routerProps) => <LoginForm onSubmit={this.login} routerProps={routerProps} />} /><br/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Boozer{this.state.auth.isLoggedIn ? `, ${this.state.auth.user.username}` : null}</h2>
          {this.loggedInDisplay()}
          <Link to='/'>Home</Link><br/>
        </div>
        <Route path="/cocktails" component={CocktailsPageContainer} />
      </div>
    );
  }
}

export default App;

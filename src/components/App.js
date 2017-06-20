import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import CocktailsPageContainer from '../containers/CocktailsPageContainer'
import { AuthAdapter,CocktailsAdapter } from '../adapter'
import Login from './Login'


class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: {
        loggedIn: false,
        user: ""
      }
    }
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  logIn(loginParams) {
    AuthAdapter.login(loginParams)
    .then(user => {
      this.setState({
        auth: {
          loggedIn: true,
          user: user
        }
      })
      localStorage.setItem("user_id", user.id)
    })
  }

  logOut() {
      this.setState({
        auth: {
          loggedIn: false,
          user: ""
        }
      })
      localStorage.clear()
    
  }

  componentDidMount() {
    if(localStorage.getItem("user_id")) {
      AuthAdapter.currentUser()
      .then(user => {
        this.setState({
          auth: {
            loggedIn: true,
            user: user
          }
        })
      })
    }
  }

  render() {
    let title
    if(this.state.auth.loggedIn) {
      title = this.state.auth.user.username
      return (
        <div className="App">
          <div className="App-header">
            <h2>Welcome to Boozer, {title}</h2>
            <Link to='/cocktails'>See All Cocktails</Link>
            <Link to='/'>Home</Link>
            <button onClick={this.logOut}>Log Out</button>
          </div>
          <Route path="/cocktails" component={CocktailsPageContainer} />
          
        </div>
      );
      
    } else {
      return (
        <div className="App">
          <div className="App-header">
            <h2>Welcome to Boozer, You Are Not Logged In</h2>
            <Link to='/login'>Login</Link>
            {title}
          </div>
          <Route path="/login" render={() => <Login onSubmit={this.logIn}/>}/>
        </div>
      );
    }

    
  }
}

export default App;

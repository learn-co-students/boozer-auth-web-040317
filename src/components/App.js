import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import CocktailsPageContainer from '../containers/CocktailsPageContainer'

import LoginForm from './LoginForm'
import { AuthAdapter } from '../adapters'

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
  }


  logIn(loginParams){
    AuthAdapter.login(loginParams)
      .then( user => {
        if (!user.error) {
          this.setState({
            auth: { isLoggedIn: true, user: user}
          })
          localStorage.setItem('user_id', user.id )
        }
      })
  }

  componentDidMount(){
    if (localStorage.getItem('user_id')) {
      AuthAdapter.currentUser()
        .then(user => {
          this.setState({
            auth: {
              isLoggedIn: true,
              user: user
            }
          })
        })
    }
  }




  render() {
    if (this.state.auth.isLoggedIn) {
      // title = this.state.auth.user.username
      alert("sup")

    } else {
    }



    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Boozer</h2>
          <Link to='/cocktails'>See All Cocktails</Link>
          <br></br>
          <Link to='/'>Home</Link>
          <br></br>
          <Link to='/login'>LOG-IN</Link>
        </div>
        <Route path="/cocktails" component={CocktailsPageContainer} />
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom'


import CocktailsPageContainer from '../containers/CocktailsPageContainer'
import Navbar from './navbar'
import LoginForm from './LoginForm'
import Welcome from './welcome'
import { AuthAdapter } from '../adapters'

class App extends Component {
    constructor(props){
    super(props)
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
          localStorage.setItem('jwt', user.jwt )
          this.props.history.push("/cocktails")

        }
      })
  }

  logOut(event){

    localStorage.clear()
    this.setState({
      auth: {
        isLoggedIn: false,
        user: {}
      }
    })
  }

  componentDidMount(){
    if (localStorage.getItem('jwt')) {
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


    return (

      <div className="container">
        <Navbar logout={this.logOut.bind(this)}/>
        <div className="App-header">

        </div>
        <Route exact path="/" component={Welcome} />
        <Route path="/cocktails" component={CocktailsPageContainer} />
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />

      </div>

    );
  }
}

export default App;

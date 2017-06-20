import React, { Component } from 'react'

import CocktailsPage from '../components/CocktailsPage'

class CocktailsPageContainer extends Component {

  constructor(){
    super()
    this.state = {
      cocktails: []
    }
  }

  componentDidMount(){
    if (localStorage.getItem('user_id')) {
      fetch('http://localhost:3000/api/v1/cocktails')
      .then(res => res.json() )
      .then( cocktails => this.setState({cocktails: cocktails.slice(0,30)}))
    }
    else{
      this.props.history.push("/login")
    }
  }

  render(){
    return (
      <CocktailsPage cocktails={this.state.cocktails} />
    )
  }
}

export default CocktailsPageContainer

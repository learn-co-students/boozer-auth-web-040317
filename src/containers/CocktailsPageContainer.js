import React, { Component } from 'react'
import CocktailsPage from '../components/CocktailsPage'
import withAuth from '../hocs/withAuth'
import { CocktailsAdapter } from '../adapters'

class CocktailsPageContainer extends Component {

  constructor(){
    super()
    this.state = {
      cocktails: []
    }
  }

  componentDidMount(){
    if (this.props.loggedIn) {
      CocktailsAdapter.all()
      .then( cocktails => this.setState({ cocktails }))
    }
  }

  render(){
    return (
      <CocktailsPage cocktails={this.state.cocktails} />
    )
  }
}

export default withAuth(CocktailsPageContainer)

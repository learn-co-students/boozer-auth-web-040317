import React, { Component } from 'react'
import { AuthAdapter } from '../adapters'
import { withRouter } from 'react-router-dom'

export default function withAuth(WrappedComponent){
  class withAuth extends Component {
    constructor(){
      super()
      this.token = localStorage.getItem('jwt')
    }
    componentDidMount(){
      if(!this.token) {
        this.props.history.push('/login')
      } else {
        AuthAdapter.currentUser()
          .then(user => {
            if (!!user && user.error) {
              this.props.history.push('/login')
            }
          })
      }
    }
    render(){
      return <WrappedComponent {...this.props} />
    }
  }
  return withRouter(withAuth)
}

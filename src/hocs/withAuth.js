import React from 'react'
import {withRouter} from 'react-router-dom'
import {AuthAdapter} from '../adapters'

export default function withAuth(WrappedComponent) {
  class withAuth extends React.Component {
    componentDidMount() {
      if (!localStorage.getItem('jwt')) {
        this.props.history.push('/login')
      } else {
        AuthAdapter.currentUser().then(user => {
          if (user.error) {
            this.props.history.push('/login')
          }
        })
      }
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }

  return withRouter(withAuth)
}

import React from 'react';

export default class LoginForm extends React.Component {

  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({ username: '', password: ''})
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Username</label>
          <input type="text" value={this.state.username} name="username" onChange={this.handleChange.bind(this)}/>
        <label>Password</label>
          <input type="password" value={this.state.password} name="password" onChange={this.handleChange.bind(this)} />
        <input type="submit" />
      </form>
    )
  }


}

import React, { Component } from 'react'

class LoginForm extends Component {

  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit( this.state )
    this.setState({username: '', password: ''})
  }

  render(){
    return (
      <div className="form-group">
      <form onSubmit={this.handleSubmit}>
        <label>Username</label>
        <input className="form-control" type='text' value={this.state.username} name="username" onChange={this.handleChange}/>
        <label>Password</label>
        <input type='password' className="form-control" value={this.state.password} name="password" onChange={this.handleChange}/>
        <br></br>
        <input className="btn btn-primary btn-lg btn-block" type="submit" value="Log me in!" />
      </form>

  </div>



    )
  }
}

export default LoginForm

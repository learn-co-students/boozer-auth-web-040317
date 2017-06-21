import React from 'react'
import {Link} from "react-router-dom"

function Welcome(){

  return (
    <div className="jumbotron">
  <h1>Nice to see you!</h1>
  <p>This is a simple website built to show an understanding of authentication using JWT on a rails server with a Reactjs front end. Check out the console when logging in/out to see whats poppin! 🔐👍</p>
  <p><a href="//github.com/RJFerguson/boozer-auth-web-040317/graphs/contributors" target="blank" className="btn btn-primary btn-lg">Who made this?</a></p>
</div>
  )

}



export default Welcome

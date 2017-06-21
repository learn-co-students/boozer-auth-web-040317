import React from 'react'
import { Link } from 'react-router-dom'


function Navbar(props){

  return (
    <div>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to='/'>Boozer<span>🍻</span></Link>

        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li> <Link to='/cocktails'>See All Cocktails</Link></li>
            <li><Link to='/login'>LOG-IN</Link></li>

          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/' onClick={props.logout}>LOG-OUT</Link></li>
          </ul>
        </div>
      </div>
    </nav>
</div>
)
}

export default Navbar

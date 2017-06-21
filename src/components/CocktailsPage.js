import React from 'react'

function CocktailsPage(props){
  return (
    <div>
      <div>
      <table className="table table-striped table-hover ">
  <thead>
    <tr>

      <th><h1>Cocktails</h1></th>
      </tr>
  </thead>
  <tbody>
        { props.cocktails.map( c => <tr key={c.id}><td >{c.name}</td></tr>) }
  </tbody>
  </table>
      </div>
    </div>
  )
}

export default CocktailsPage

import React from 'react'

function CocktailsPage(props){
  return (
    <div>
      <h1>Cocktails</h1>
      <div>
        { props.cocktails.map( c => <p key={c.id}>{c.name}</p>) }
      </div>
    </div>
  )
}

export default CocktailsPage

const baseUrl = 'http://localhost:3000/api/v1'

export class AuthAdapter {
  static login(loginParams){
    return fetch(`${baseUrl}/auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json() )
  }

  static logout(){
    return fetch(`${baseUrl}/auth`, {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify()
    }).then(res => res.json() )
  }

  static currentUser(){
    return fetch(`${baseUrl}/current_user`, {
      headers: headers()
    }).then(res => res.json() )
  }
}

export class CocktailsAdapter  {
  static all(){
    return fetch(`${this.url()}`)
      .then( res => res.json() )
  }

  static create(cocktail){
    return fetch(`${this.url()}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        cocktail: {name: cocktail.name}
      })
    }).then(response => response.json() )
  }

  static update(cocktail){
    return fetch(`${this.url()}/${cocktail.id}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({
        cocktail: {name: cocktail.name}
      })
    })
  }

  static destroy(id){
    return fetch(`${this.url()}/${id}`, {
      method: 'DELETE'
    }).then(res => res.json() )
  }

  

  static url(){
    return `${baseUrl}/cocktails`
  }
}

function headers() {
    return {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('user_id')
    }
}
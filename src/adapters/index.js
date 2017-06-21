const baseUrl = 'http://localhost:3000/api/v1'

export class CocktailsAdapter {
  static all() {
    return fetch(`${baseUrl}/cocktails`, {
      headers: headers()
    }).then(res => res.json())
  }
}

export class AuthAdapter {
  static logIn(loginParams) {
    return fetch(`${baseUrl}/auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static currentUser() {
    return fetch(`${baseUrl}/current_user`, {
        headers: headers()
      })
      .then(res => res.json())
  }
}

function headers() {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}

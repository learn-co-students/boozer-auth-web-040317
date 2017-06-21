const baseUrl = 'http://localhost:3000/api/v1'

export class AuthAdapter {
  static login(loginParams){
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json() )
  }
  static currentUser(){
    return fetch(`${baseUrl}/current_user`, {
      headers: headers()
    }).then(res => res.json() )
  }

  static url(){
    return `${baseUrl}/cocktails`
  }
}

function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}

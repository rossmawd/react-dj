
import Link from '@material-ui/core/Link';
import React from 'react';

const endpoint = 'http://localhost:3000/api/v1/'
//Sam's Auth code:
const signupUrl = `${endpoint}/users`
const loginUrl = `${endpoint}/login`
const validateUrl = `${endpoint}/validate`

const jsonify = res => {
  // return res.json()
  if (res.ok)
    return res.json()
  else {
    const jsonData = res.json()
    return jsonData.then(data => {
      if (data.errors) {
        throw data.errors
      } else {
        return data
      }
    })
  }
}

const handleServerError = errors => {
  console.error(errors)
  throw errors
} //only called in catch

// const cards = () => {
//   return fetch(cardsUrl)
//     .then(jsonify)
//     // .then(console.log)
//     .catch(handleServerError)
// }
//Sam's Auth Code...
const constructHeaders = (moreHeaders = {}) => (
  {
    'Authorization': localStorage.getItem('token'),
    ...moreHeaders
  }
)

const signUp = (user) => fetch(signupUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
}).then(jsonify)
  .then(data => {
    console.log("token: ", data.token)
    localStorage.setItem('token', data.token)
    return data.user
  })
  .catch(handleServerError)


const logIn = (user) => fetch(loginUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
}).then(jsonify)
  .then(data => {
    console.log("token: ", data.token)
    console.log(data)
    localStorage.setItem('token', data.token)
    localStorage.setItem('currentUser', data.user.id)
    return data.user
  })
  .catch(handleServerError)                       

const validateUser = () => {
  if (!localStorage.getItem('token')) return Promise.resolve({ error: 'no token' })

  return fetch(validateUrl, {
    headers: constructHeaders()
  }).then(jsonify)
    .then(data => {
      localStorage.setItem('token', data.token)
      return data.user
    })
    .catch(handleServerError)
}

// const fetchTotalScores = () => {
//   return fetch(totalsUrl)
//     .then(jsonify)
//     .catch(handleServerError)
// }

// const postGame = (game) => fetch(gameUrl, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ game })
// }).then(jsonify)
//   .then(game => {
//     console.log("game: ", game)
//     return game
//   })
//   .catch(handleServerError)

const logOut = (props) => {
  localStorage.removeItem('token')
  localStorage.removeItem('currentUser')
  props.clearCurrentUser()  
  props.history.push('/')
 
}

export default {
  signUp,
  logIn,
  validateUser,
  logOut,
}




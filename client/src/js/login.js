import { api } from './libs/api'

var form = document.querySelector('#loginForm')

form.onsubmit = function (e) {
  e.preventDefault()
  var formElements = this.elements

  var data = {
    username: formElements.namedItem('username').value,
    password: formElements.namedItem('password').value
  }

  api.post('/login', data)
    .then(() => { location.href = '/' })
    .catch(console.error)
}

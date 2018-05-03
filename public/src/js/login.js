var form = document.querySelector('#loginForm')

form.onsubmit = function (e) {
  e.preventDefault()
  var formElements = this.elements

  var data = {
    username: formElements.namedItem('username').value,
    password: formElements.namedItem('password').value
  }

  var json = JSON.stringify(data)

  var xhr = new XMLHttpRequest()
  xhr.open('POST', '/login', true)
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8')
  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText)
      console.log('login', data)
      location.href = '/'
    } else {
      console.error(xhr.statusText)
    }
  }

  xhr.send(json)
}

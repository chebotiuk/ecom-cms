import 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.svg'
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.eot'
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff'
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap.native/dist/bootstrap-native.min.js'

import '../css/main.css'

var logoutBtn = document.querySelector('#logoutBtn')

if (logoutBtn) {
  logoutBtn.onclick = function () {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', '/logout', true)
    xhr.onload = function () {
      if (xhr.readyState == 4 && xhr.status === 200) {
        console.log('logout')
      } else {
        console.error(xhr.statusText)
      }
    }

    xhr.send()
  }
}

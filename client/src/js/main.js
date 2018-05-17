import 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.svg'
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.eot'
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff'
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap.native/dist/bootstrap-native.min.js'

import '../css/main.css'

import { api } from './lib/api'

var logoutBtn = document.querySelector('#logoutBtn')

if (logoutBtn) {
  logoutBtn.onclick = function () {
    api.post('/logout')
      .then(() => { location.href = '/' })
      .catch(console.error)
  }
}

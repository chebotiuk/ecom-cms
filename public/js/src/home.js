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

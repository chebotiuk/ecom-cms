var queryString = params => 
  Object.keys(params)
    .map((key) =>
      encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )
    .join('&')

export class RestClient {
  constructor ({ serverUrl = '', apiVersionNumber = '1' }) {
    this.baseUrl = serverUrl + '/api/v' + apiVersionNumber
  }

  getFullUrl (path) {
    return this.baseUrl + path
  }

  get (path, params) {
    return fetch(
      this.getFullUrl(path) + (params ? `?${queryString(params)}` : ''),
      {
        method: 'GET',
        credentials: 'same-origin',
      }
    )
  }

  post (path, content = {}) {
    return fetch(
      this.getFullUrl(path),
      {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      }
    )
  }

  put (path, content = {}) {
    return fetch(
      this.getFullUrl(path),
      {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      }
    )
  }

  delete (path) {
    return fetch(
      this.getFullUrl(path),
      {
        method: 'DELETE',
        credentials: 'same-origin',
      }
    )
  }
}

{{# if user }}
  <button class="btn btn-primary" id="logoutBtn">Log out</button>
{{ else }}
  <a href="/login">Log in</a>
{{/if}}

<h1>{{{ title }}}</h1>
<p>Welcome to {{{ title }}}</p>
<p>Hello, {{ user.username }}</p>

<script src="/js/dist/home.js" />

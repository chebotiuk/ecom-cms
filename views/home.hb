<div class="container">
  <div class="row">
    <div class="col-md-12">
      {{# if user }}
        <button class="btn btn-primary" id="logoutBtn">Log out</button>
      {{ else }}
        <a href="/login">Log in</a>
      {{/if}}
      <h1>{{{ title }}}</h1>
      <p>Welcome to {{{ title }}}</p>
      <p>Hello, {{ user.username }}</p>
    </div>
  </div>
</div>

<script src="/home.js"></script>

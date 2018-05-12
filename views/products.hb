<div class="container">
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <tr>
          <th>Name</th>
          <th>Wholesale price</th>
          <th>Price</th>
        </tr>
        {{#each products}}
            <tr>
              <td><b>{{this.name}}</b></td>
              <td>{{this.wholesalePrice}}</td>
              <td>
                {{#if this.price}}
                    {{this.price}}
                {{else}}
                    {{this.calculatedPrice}}
                {{/if}}
              </td>
            </tr>
        {{/each}}
      </table>
    </div>
  </div>
<div>

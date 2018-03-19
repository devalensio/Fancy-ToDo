let component = {
  template: `
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="jumbotron">
        <div class="container">
          <p>Quotes Of the Day :</p>
          <p style="font-weight: bold">"{{show_quotes.quote}}"</p>
          <p class="lead">-{{show_quotes.author}}</p>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['show_quotes']
}
Vue.component('component-quotes', component)

let componentBody = {
  template: `
    <div class="row">
      <div class="col-md-4" v-for="data in data_todo" style="padding-bottom: 28px">
        <div class="card">
          <div class="card-body" >
            <h5 v-if="!data.done" class="card-title">{{data.title}}</h5>
            <h5 v-else class="card-title" style="text-decoration: line-through">{{data.title}}</h5>
            <p class="card-text">{{data.description}}</p>
            <a v-if="!data.done" href="javascript:void(null);"class="btn btn-success" v-on:click="toggle(data)">Done ?</a>
            <a v-else href="javascript:void(null);"class="btn btn-warning" v-on:click="toggle(data)">Undone ?</a>
            <a href="javascript:void(null)" class="btn btn-danger" v-on:click="deletetodo(data)">Delete</a>
          </div>
        </div>
      </div>
    </div>
  `,
  props: ['data_todo'],
  methods: {
    toggle: function (obj) {
      this.$emit('toggle', obj)
    },
    deletetodo: function (obj) {
      this.$emit('delete',obj)
    }
  }
}
Vue.component('component-todo', componentBody)

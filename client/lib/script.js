if (!localStorage.token) {
  window.location = 'login.html';
}

new Vue({
  el: '#vue-app',
  data: {
    title: '',
    message: '',
    data_todo: [],
    show_quotes: []
  },
  created: function (){
    this.showTodo(),
    this.quotesTodo()
  },
  methods: {
    addTodo: function () {
      swal("Todo has been created!");
      axios({
        method: 'post',
        url: 'http://localhost:3000/todos',
        data: {
          token: localStorage.token,
          title: this.title,
          message: this.message
        }
      }).then(({data}) => {
        this.data_todo.push(data.data_todo);
      })
    },
    showTodo:function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/todos',
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        this.data_todo = data.data_todo;
      })
    },
    deleteTodo:function (obj) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this todo anymore!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios({
            method: 'get',
            url: 'http://localhost:3000/todos/delete',
            headers: {
              id: obj._id
            }
          }).then(() => {
            this.showTodo()
          })
          swal("Poof! Your todo has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Todo is safe!");
        }
      });

    },
    toggleTodo: function (obj) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/todos/toggle',
        headers: {
          id: obj._id,
          done: obj.done
        }
      }).then(data => {
        this.showTodo()
      })
    },
    quotesTodo: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/todos/quotes'
      }).then(({data}) => {
        console.log(data.data);
        this.show_quotes = data.data
      })
    }
  }
})

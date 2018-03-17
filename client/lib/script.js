new Vue({
  el: '#vue-app',
  data: {
    title: '',
    message: '',
    data_todo: []
  },
  created: function (){
    this.showTodo()
  },
  methods: {
    addTodo: function () {
      alert('todo created')
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
      console.log(obj);
      axios({
        method: 'get',
        url: 'http://localhost:3000/todos/delete',
        headers: {
          id: obj._id
        }
      }).then(() => {
        this.showTodo()
      })
    },
    toogleTodo: function (obj) {
      console.log(obj);
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
    }

  }
})

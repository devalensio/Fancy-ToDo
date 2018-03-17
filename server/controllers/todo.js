const todo = require('../models/todo')
const jwt = require('jsonwebtoken');


module.exports = {
  addTodo: function (req, res) {
    let token = req.body.token
    let decoded = jwt.verify(token, process.env.SECRET)
    const todos = new todo()
      todos.owner = decoded._id
      todos.title = req.body.title
      todos.description = req.body.message
      todos.save().then(data_todo => {
        res.status(201).json({
          message: 'new todo was created',
          data_todo
        })
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'error'
        })
      })
  },
  showTodo: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    todo.find({owner : decoded._id}).then(data_todo => {
      console.log(data_todo);
      res.status(201).json({
        message: 'Your todo',
        data_todo
      })
    }).catch(err => {
      res.status(500).json({
        message: 'error'
      })
    })
  },
  deleteTodo: function (req, res) {
    console.log(req.headers);
    todo.deleteOne({_id: req.headers.id}).then(() => {
      res.status(201).json({
        message: 'deleted'
      })
    })
  },
  toggleTodo: function (req, res) {
    todo.findOne({_id: req.headers.id}).then(data => {
      res.status(201).json({
        message: 'todo',
        data
      })
      if (data) {
        data.done = !data.done;
        todo.update({
          _id: req.headers.id
        }, {
          $set: {done: data.done}
        }).then(() => {
          res.status(200).json({
            message: 'update done status',
          })
        }).catch(err => {
          res.status(500).json({
            message: 'error bos'
          })
        })
      }
    })
  }
};
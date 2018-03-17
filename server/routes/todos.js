var express = require('express');
var router = express.Router();
const { addTodo,showTodo,deleteTodo,toggleTodo } = require('../controllers/todo.js');

/* GET users listing. */
router.post('/', addTodo);
router.get('/', showTodo);
router.get('/delete', deleteTodo);
router.get('/toggle', toggleTodo);

module.exports = router;

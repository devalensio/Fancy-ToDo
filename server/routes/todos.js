var express = require('express');
var router = express.Router();
const { addTodo,showTodo,deleteTodo,toggleTodo,quotesTodo } = require('../controllers/todo.js');

/* GET users listing. */
router.post('/', addTodo);
router.get('/', showTodo);
router.get('/delete', deleteTodo);
router.get('/toggle', toggleTodo);
router.get('/quotes', quotesTodo);

module.exports = router;

var express = require('express');
var router = express.Router();
const { signUp,masuk } = require('../controllers/user.js');

/* GET users listing. */
router.post('/signup', signUp);
router.post('/login', masuk);


module.exports = router;

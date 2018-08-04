const User = require('../models/users');
const FB = require('fb');
const token = require('../middlewares/token');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports = {
  masuk: function (req, res) {
      User.findOne({
          email: req.body.email
      }).then(data_user => {
          bcrypt.compare(req.body.password, data_user.password, function (err, response) {
              if (response) {
                  const token = jwt.sign({id: data_user._id, name: data_user.name}, process.env.SECRET)
                  res.status(200).json({
                      message: 'login success',
                      name: data_user.name,
                      token: token
                  })
              } else {
                console.log('wkwkwkwk');
                  res.status(500).json({
                      message: 'password incorrect'
                  })
              }
          })
      }).catch(error => {
          res.status(500).json({
              message: 'email or passord incorrect'
          })
      })
  },
  signUp: function (req, res) {
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(req.body.password, salt)
      const user = new User()
      user.name = req.body.name
      user.email = req.body.email
      user.password = hash
      user.save().then(data_user => {
          res.status(200).json({
              message: 'success create user',
              data_user
          })
      })
  },
}

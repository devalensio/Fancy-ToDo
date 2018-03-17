const User = require('../models/users');
const FB = require('fb');
const token = require('../middlewares/token');

module.exports = {
    signIn(req, res) {
        FB.setAccessToken(req.body.accessToken)
        FB.api('me', { fields: ['id', 'name', 'email'], access_token: req.body.access_token }, (data) => {
            if (!data.error) {
                let newUser = new User({
                    id_fb: data.id,
                    name: data.name,
                    email: data.email,
                })
                User.findOne({ id_fb: data.id }).exec()
                .then(user => {
                    if (user) {
                        return res.status(200).json({
                            message: "Signin success",
                            id: user._id,
                            token: token.generate({ ...user._doc, access_token: req.body.access_token })
                        });
                    } else {
                        newUser.save(err => {
                            if (err) return res.status(500).json({ message: err });
                            return res.status(200).json({
                                message: "New User successfully created",
                                id: newUser._id,
                                token: token.generate({ ...newUser._doc, access_token: req.body.access_token })
                            });
                        })
                    }

                })
                .catch(err => res.status(500).json(err))
            }
        })
    }
};

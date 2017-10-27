const jwt = require('jwt-simple');
const User = require('../model/user');
const config = require('../config');

function validateInput(email, password) {
    return !(!email || !password);

}
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    const exp = timestamp + (2 * 60 * 1000);

    return jwt.encode({sub: user.id, iat: timestamp, exp: exp}, config.secret);
}

exports.signin = function(req, res, next) {
    res.send({ token: tokenForUser(req.user), role: req.user.role });
}

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!validateInput(email, password)) {
        return res.status(422).send({error: 'You must provide email and password'});
    }

    // See if a user with the given email exists
    User.findOne({email: email}, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        // If a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }

        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password,
            role: 'user'
        });

        user.save((err) => {
            if (err) {
                return next(err);
            }

            // Repond to request indicating the user was created
            res.json({token: tokenForUser(user), role: user.role});
        });
    });
};
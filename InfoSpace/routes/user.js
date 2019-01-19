const express = require('express'),
	  router = express.Router(),
	  bcrypt = require('bcryptjs'),
	  jwt = require('jsonwebtoken'),
	  passport = require('passport');
	  validateRegisterInput = require('../validation/register'),
	  validateLoginInput = require('../validation/login'),
	  User = require('../models/User');

router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
    	email: req.body.email
    }).then(user => {
    	if (user) {
    		return res.status(400).json({
    			email: 'Email already exists'
    		})
    	} else {
    		const newUser = new User({
    			email: req.body.email,
    			password: req.body.password
    		});

    		bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {                                    
                                    const payload = {
                                        id: user._id                                        
                                    }
                                    jwt.sign(payload, 'secret', {
                                        expiresIn: 3600 //seconds
                                    }, (err, token) => {
                                        if(err) console.error('There is some error in token', err);
                                        else {
                                            res.json({
                                                success: true,
                                                token: `Bearer ${token}`,
                                                user: user
                                            });
                                        }
                                    });                                    
                                }); 
                        }
                    });
                }
            });
    	}
    });
});

router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({
		email: req.body.email
	}).then(user => {
        if(!user) {
            errors.email = 'User not found'
            return res.status(404).json(errors);
        }
        bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
                if(isMatch) {
                    const payload = {
                        id: user.id                        
                    }
                    jwt.sign(payload, 'secret', {
                        expiresIn: 3600 //seconds
                    }, (err, token) => {
                        if(err) console.error('There is some error in token', err);
                        else {
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            });
                        }
                    });
                }
                else {
                    errors.password = 'Incorrect Password';
                    return res.status(400).json(errors);
                }
            });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        email: req.user.email
    });
});

module.exports = router;
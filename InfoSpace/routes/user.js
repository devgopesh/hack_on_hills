const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const User = require('../models/User');

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {            
            const newUser = new User({    
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                username: req.body.username,
                roll: req.body.roll,
                course: req.body.course,
                person: req.body.person,
                profession: req.body.profession,
                passing: req.body.passing
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

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id                                
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
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
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});

router.post('/sendmail', (req, res) => {
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
     type: 'OAuth2', //Authentication type
     user: 'gopeshsinghal123@gmail.com', //For example, xyz@gmail.com
     clientId: '1039234355869-f498ailtt61jglhn8smc0sbrt7iip3g7.apps.googleusercontent.com',
     clientSecret: 'Gcoaq8J1dEWTddHt3jllm5Cc',
     refreshToken: '1/qiFt7WS9tqRK2YqhyhkqPWPJW0_Kvd6xxfYR67x0T8A'
         }
    });    
    let mailOptions = {
    from: 'gopeshsinghal123@gmail.com',
    to: req.body.to,
    subject: 'This is subject',
    text: 'This is email content'};

    transporter.sendMail(mailOptions, function(e, r) {
    if (e) {
      console.log(e);
    }
    else {
      console.log(r);
        }
    transporter.close();
    });
    // console.log(req.body.to)
    res.send({})
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        email: req.user.email
    });
});

module.exports = router;
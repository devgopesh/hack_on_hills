const express = require('express'),
	  mongoose = require('mongoose'),
	  bodyParser = require('body-parser'),
	  passport = require('passport');	 

const users = require('./routes/user'); 

const app = express();
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/', (req, res) => {
	res.send('HI!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
// const nodemailer = require('nodemailer');
// const xoauth2 = require('xoauth2');

// let transporter = nodemailer.createTransport({
// service: 'gmail',
// host: 'smtp.gmail.com',
// secure: 'true',
// port: '465',
// auth: {
// 	type: 'OAuth2', //Authentication type
// 	user: 'gopeshsinghal123@gmail.com', //For example, xyz@gmail.com
// 	clientId: '1039234355869-f498ailtt61jglhn8smc0sbrt7iip3g7.apps.googleusercontent.com',
// 	clientSecret: 'Gcoaq8J1dEWTddHt3jllm5Cc',
// 	refreshToken: '1/qiFt7WS9tqRK2YqhyhkqPWPJW0_Kvd6xxfYR67x0T8A'
//      }
// });

// let mailOptions = {
// from: 'gopeshsinghal123@gmail.com',
// to: 'kartiksaxena500@gmail.com',
// subject: 'This is subject',
// text: 'This is email content'};

// transporter.sendMail(mailOptions, function(e, r) {
// if (e) {
//   console.log(e);
// }
// else {
//   console.log(r);
//     }
// transporter.close();
// });

// module.exports = transporter;

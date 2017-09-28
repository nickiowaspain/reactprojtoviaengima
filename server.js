const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));


app.post('/encrypt', function(req,res) {
	console.log('hit!!!!', req.body.message)
    
})

var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';

function encrypt(text){
var cipher = crypto.createCipher(algorithm,password)
var crypted = cipher.update(text,'utf8','hex')
crypted += cipher.final('hex');
return crypted;
}

function decrypt(text){
var decipher = crypto.createDecipher(algorithm,password)
var dec = decipher.update(text,'hex','utf8')
dec += decipher.final('utf8');
return dec;
}

var hw = encrypt("hello world^^^" + Date.now().toString())
// outputs hello world
console.log(hw);
console.log(decrypt(hw));




// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});



// var crypto = require('crypto'),
// algorithm = 'aes-256-ctr',
// password = 'd6F3Efeq';

// function encrypt(text){
// var cipher = crypto.createCipher(algorithm,password)
// var crypted = cipher.update(text,'utf8','hex')
// crypted += cipher.final('hex');
// return crypted;
// }

// function decrypt(text){
// var decipher = crypto.createDecipher(algorithm,password)
// var dec = decipher.update(text,'hex','utf8')
// dec += decipher.final('utf8');
// return dec;
// }

// var hw = encrypt("hello world")
// // outputs hello world
// console.log(decrypt(hw));
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const bodyParser = require('body-parser');
const crypto = require('crypto');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));


app.post('/encrypt', function(req,res) {
  console.log('hit!!!!', req.body)
  let result = runMe(req)
  res.send(result)
  // if(checkExpirationDate()) {
  //   res.send('success')
  // }
})

app.post('/decrypt', function(req,res) {
  console.log('decrypt hit!!!!', req.body.encryptedMsg)
  let dec = decrypt(req.body.encryptedMsg)
  if(checkExpirationDate(dec)) {
    res.send(dec)
  } else {
    res.send('Error')
  }
})

function runMe(request) {
  console.log(request.body)
  let str = request.body.message + ' extraData: ' + request.body.name + ' ' + request.body.expirationDate;
  let encryptedData = encrypt(str)
  console.log('encrypted:', encryptedData)
  // let dec = decrypt(isIt)
  // console.log('here is decry:', dec)
  return encryptedData
}

function checkExpirationDate(str) {
  let splitted = str.split(' ');
  console.log('splitted:', splitted)
  if(+Date.parse(splitted[splitted.length - 1]) > +Date.now()){
    return true;
  }
  return false;
}




let algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';

function encrypt(text){
let cipher = crypto.createCipher(algorithm,password)
let crypted = cipher.update(text,'utf8','hex')
crypted += cipher.final('hex');
return crypted;
}

function decrypt(text){
let decipher = crypto.createDecipher(algorithm,password)
let dec = decipher.update(text,'hex','utf8')
dec += decipher.final('utf8');
return dec;
}

let hw = encrypt("hello world^^^" + Date.now().toString())
// outputs hello world
console.log(hw);
console.log(decrypt(hw));




// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
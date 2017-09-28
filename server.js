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
  console.log('hit encrypt!!!!', req.body)
  let encrypted = prepareAndEncrypt(req);
  res.send(encrypted);
})

app.post('/decrypt', function(req,res) {
  console.log('decrypt hit!!!!', req.body.encryptedMsg)
  let decryptedStr = decrypt(req.body.encryptedMsg);
  if(checkExpirationDate(decryptedStr)) {
    res.send(decryptedStr);
  } else {
    res.send('Error')
  }
})

function prepareAndEncrypt(request) {
  console.log(request.body)
  let preparedStr = request.body.message + ',' + request.body.name + ',' + request.body.expirationDate;
  let encryptedData = encrypt(preparedStr);
  console.log('encrypted:', encryptedData)
  return encryptedData;
}

function checkExpirationDate(str) {
  let splitStr = str.split(',');
  console.log('splitStr:', splitStr)
  console.log('splitStr[2]', splitStr[2])
  console.log('date now', Date.now())
  if(+Date.parse(splitStr[2]) > +Date.now()) {
    console.log('this is true!!1')
    return true;
  }
  console.log('this is false!!!')
  return false;
}

app.get('/newPassphrase', function(req,res) {
  let passphrase = crypto.randomBytes(5).toString('base64').slice(0,5);
  res.send(passphrase);
}) 



let algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';

function encrypt(text) {
  let cipher = crypto.createCipher(algorithm,password)
  let crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text) {
  let decipher = crypto.createDecipher(algorithm,password)
  let dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

// let hw = encrypt("hello world^^^" + Date.now().toString())
// console.log(hw);
// console.log(decrypt(hw));


app.listen(3000, function () {
  console.log('Tovia app listening on port 3000!\n');
});
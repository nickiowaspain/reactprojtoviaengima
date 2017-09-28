const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const bodyParser = require('body-parser');
const crypto = require('crypto');

let algorithm = 'aes-256-ctr';
let passphrase = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.post('/encrypt', function(req,res) {
  let encrypted = prepareAndEncrypt(req);
  res.send(encrypted);
})

app.post('/decrypt', function(req,res) {
  let decryptedStr = decrypt(req.body.encryptedMsg);
  if(checkExpirationDate(decryptedStr)) {
    res.send(decryptedStr);
  } else {
    res.send('Error!');
  }
})

function prepareAndEncrypt(request) {
  let preparedStr = request.body.message + ',' + request.body.name + ',' + request.body.expirationDate;
  let encryptedData = encrypt(preparedStr);
  return encryptedData;
}

function checkExpirationDate(str) {
  let splitStr = str.split(',');
  if(+Date.parse(splitStr[2]) > +Date.now()) {
    return true;
  }
  return false;
}

app.post('/setPassPhrase', function(req,res) {
  passphrase = req.body.passphrase;
  res.send('Passphrase set');
})

app.get('/newPassphrase', function(req,res) {
  passphrase = crypto.randomBytes(5).toString('base64').slice(0,5);
  res.send(passphrase);
}) 

function encrypt(text) {
  let cipher = crypto.createCipher(algorithm,passphrase);
  let crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text) {
  let decipher = crypto.createDecipher(algorithm,passphrase);
  let dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}


app.listen(3000, function () {
  console.log('Tovia app listening on port 3000!\n');
});
const express = require('express');
const mongoose = require('mongoose');
// const cookieSession = require('cookie-session');
// const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('./moduls/User');
require('./moduls/ConstructionType');
require('./moduls/PropertyType');
require('./moduls/State');
require('./moduls/Offer');
require('./moduls/Neighborhood');
require('./moduls/PhoneNumber');
require('./moduls/OfferPhoneIds');

// require('./services/passport');
const app = express();
app.use(bodyParser());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/', (req, res, next) => {
  console.log('HERE !!!!!!!!!!!!!!!!!!!!!!');
  console.log(req.url);
  next();
});

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('---------------- keys.mongoURI --------------');
    console.log(keys.mongoURI);
  })
  .catch((e) => {
    console.log('SOME ERROR !!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(e);
  });
// const cookieExpiredTime = 30 * 24 * 60 * 60 * 1000;
// const cookieSicret = keys.cookieKey;
// .connect(url, { useNewUrlParser: true })
// app.use(
//   cookieSession({
//     maxAge: cookieExpiredTime,
//     keys: [cookieSicret]
//   })
// );
// app.use(passport.initialize())
// app.use(passport.session());

// require('./routes/authRoutes')(app);
require('./routes/offers')(app);

const Offer = mongoose.model('offers');
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server listen on port: ' + PORT);
});

// { listIndexes: "constructiontypes", cursor: {  }, $clusterTime: { clusterTime: {1686662662 17}, signature: { hash: {0 [211 204 225 183 174 53 249 118 2 144 47 238 163 132 14 21 183 246 113 17]}, keyId: 7200653830139150336.000000 } }, lsid: { id: {4 [217 58 204 53 169 78 76 103 174 173 239 160 194 158 45 29]} } }

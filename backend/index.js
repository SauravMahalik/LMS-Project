const express = require('express');
const app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const multer  = require('multer')
var multiparty = require('multiparty');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var FormData = require('form-data');
var Sequelize = require('sequelize');
var mongoose = require("mongoose");
const passport = require('passport');
var User = require("./model/user");
var kafka = require('./kafka/client');

var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

mongoose.connect(
    "mongodb+srv://canvas_user:2407Rakhee%21@cluster0-jjkgt.mongodb.net/canvasdb?poolSize=10?retryWrites=true",
    {
      useNewUrlParser: true,
    }
  );
  mongoose.connection.on("connected", () => {
    console.log("Connected to database!");
  });
  mongoose.connection.on("error", err => {
    console.log(err);
  });

  var jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
  jwtOptions.secretOrKey = 'studentuserkey';
  
  var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    return User.findOne({
        user_email: jwt_payload.user_email,
        user_type: jwt_payload.user_type
      })
      .then(user => {
        if (user) {
            return next(null, user);
          } else {
            return next(null, false);
          }
        });
        })

  passport.use(strategy);

  app.use(require('express-session')({
    secret: 'keyboardsecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());

const Op = Sequelize.Op;
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
process.env.SECRET_KEY = 'secret'

app.use(cookieParser());

app.use(express.static('public'));
app.use(sessions({
    secret              : 'cmpe273_secret',
    resave              : true, 
    saveUninitialized   : true, 
    duration            : 60 * 60 * 1000,    
    activeDuration      :  5 * 60 * 1000
}));


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
  });

app.use('/profile_uploads',express.static('profile_uploads'));

const file_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("in cb file destination : ",file.originalname);
        cb(null, './profile_uploads/')
    },
    filename: function (req, file, cb) {
        console.log("in cb file Body : ",file.originalname);
      cb(null, new Date().toISOString() + file.originalname)
    }
  })

  const fileFilter = (req,file,cb) => {
      if(file.mimetype==='image/jpeg' || file.mimetype==='image/png')
      cb(null,true)
else 
      cb(null,false)
  }

  const upload = multer({ storage: file_storage ,fileFilter:fileFilter});

app.use('/users', require('./routes/users.js'))
app.use('/course', require('./routes/course.js'))

const port = process.env.PORT || 3001;
app.listen(port, () => {
console.log(`server started on port ${port}`);
});

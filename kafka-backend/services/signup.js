const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

console.log("in signup service")

var User = require("../model/user");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    var res = {};
console.log("signup email:" + msg.user_email )
   

User.findOne({ user_email: msg.user_email })
.then(user => {
    if (user) {
        console.log("user already registered");
        res=({user: user, code: "202"});
        callback(null, res);

    } else {
        const newUser = new User({

                user_name: msg.user_name,
                user_password: msg.user_password,
                user_email: msg.user_email,
                user_type: msg.user_type
            }) 

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.user_password, salt, (err, hash) => {
          if (err) throw err;
          newUser.user_password = hash;
          newUser
            .save()
            .then(result => {
                console.log("result of query" + result)
                res=({user: result, code: "201"});
                callback(null, res);

                })
            .catch(err => {
                console.log("first error" + err);
                res=({user: err, code: "500"});
                callback(null, res);

            })
        });
    });
}
        })  
             .catch(err => {
                console.log("Error case.." + err);
                res=({"Message": err, status: "false", code: "500"});
                callback(null, res);

            })
}

exports.handle_request = handle_request;

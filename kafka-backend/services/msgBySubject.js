console.log("in msg by subject")

var User = require("../model/message");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    var subject = msg.subject;

    var res = {};

Message.find( { $and:[{subject: subject}, {$or:[ {user_email: msg.email}, {to_email:msg.email}]}]}  )

            .select('user_email to_email subject message')
         .exec()
         .then(messages => {
             if (messages) {

                callback(null, messages);
             }})
             .catch(err => {
                console.log("first error" + err);
                res=({"Message": err, status: "false", code: "500"});
                callback(null, res);
            })
}

exports.handle_request = handle_request;
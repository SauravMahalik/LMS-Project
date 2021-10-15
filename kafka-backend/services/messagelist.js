console.log("in messagelist service")


var Message = require("../model/message");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    var email = msg.email;
    var res = {};
    Message.aggregate([
        {
             $match: {

        $or:[ {user_email: email}, {to_email:email}]  
             }
         },

         {"$group":{
             "_id": "$subject",toemail: { $first: "$to_email"},fromemail:{ $first: "$user_email"},

             "subject": { "$last": "$subject" } 
        }}
     ])
         .exec()
         .then(messages => {
            if (messages) {
               console.log("variables" + messages.user_email ) 
                console.log("user found" + JSON.stringify(messages));

                 callback(null, messages);

             }})
             .catch(err => {
                console.log("Error case.." + err);
                res=({"Message": err, status: "false", code: "500"});
                callback(null, res);

            })
     
}

exports.handle_request = handle_request;

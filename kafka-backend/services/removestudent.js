console.log("in removestudent service")

var User = require("../model/user");

function handle_request(msg, callback){
    console.log("In handle request:" + " " + msg.course_id + " " + msg.user_email);
    var res = {};

    User.findOneAndUpdate({user_email: msg.user_email},
        {$pull:{user_courses:{course_id:msg.course_id} } }
    
   )
         .then(messages => {
            if (messages) {
                console.log("message created" + JSON.stringify(messages));
             res=({user: messages, status: "true", code: "200"});

                 callback(null, res);

             }})
             .catch(err => {
                console.log("Error case.." + err);
                res=({"Message": err, status: "false", code: "500"});
                callback(null, res);

            })
}

exports.handle_request = handle_request;

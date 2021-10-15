console.log("in get dashboard courses")

var User = require("../model/user");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    console.log(msg.user_email)
    var res = {};

    User.findOne({
        user_email: msg.user_email
     })  .select('user_courses user_type')

         .exec()
         .then(user => {
             if (user) {
               console.log("record found 1 " + user.user_courses);
                 console.log("record found" + user.course_id);
                 console.log("user found" + user);
                
               res=({user: JSON.stringify(user), code: "200"});
             
               callback(null, res);
            
             }else {
                res=({code: "404"});
                callback(null, res);
            }
            })
            .catch(err => {
                console.log("Error case.." + err);
                res=({code: "500"});
                callback(null, res);
            })

}

exports.handle_request = handle_request;



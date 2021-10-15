console.log("in post announcement service")

var Message = require("../model/course_announce");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    var res = {};

    const announceFields = new Announce({
        course_id: msg.course_id,
        title: msg.title,
        posted_on: msg.posted_on,
        content: msg.content
    })
    announceFields
.save()
         .then(anc => {
            if (anc) {
                console.log("announcement created" + JSON.stringify(anc));
             res=({user: anc, code: "200"});
         
                 callback(null, res);
                
             }})
             .catch(err => {
                console.log("Error case.." + err);
                res=({"Message": err,  code: "500"});
                callback(null, res);
             
            })
}

exports.handle_request = handle_request;

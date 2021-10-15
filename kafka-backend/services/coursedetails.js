console.log("in course details")


var User = require("../model/user");
var Course = require("../model/course");

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
  
    var email = msg.email;
    var course_id = msg.course_id

    var res = [];
    Course.findOne({
        course_id: course_id
     })  .select('course_id course_name course_dep course_desc course_room course_cap course_wl_cap course_term course_enrollment_count course_wl_count')
         .exec()
         .then(course => {
             if (course) {
                 console.log("record found" + course.course_name);
                 console.log("user found" + course);
               
                var retFields = []
                retFields.push({"course_id": course.course_id,
                                "course_name": course.course_name,
                                "course_dep": course.course_dep,
                                "course_desc": course.course_desc,
                                "course_room": course.course_room,
                                "course_cap": course.course_cap,
                                "course_wl_cap": course.course_wl_cap,
                                "course_term": course.course_term,
                                "course_enrollment_count": course.course_enrollment_count,
                                "course_wl_count": course.course_wl_count
                            });    
                res=retFields
                 callback(null, res);
              
             }})
             .catch(err => {
                console.log("Error case.." + err);
                res=({"Message": err, status: "false", code: "500"});
                callback(null, res);
            
            })
 
}

exports.handle_request = handle_request;



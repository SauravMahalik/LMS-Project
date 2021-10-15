var mongoose = require('mongoose');

var assignmentSchema = mongoose.Schema({
        course_id: {
            type: String,
        },
        title: {
            type: String
        },
        due_date: {
            type: String
        },
        posted_on: {
            type: String
        },
        content: {
            type: String
        },
        total_points: {
            type: Number
        }
    })
 Assigns = module.exports = mongoose.model('assignments',assignmentSchema);
 module.exports = Assigns
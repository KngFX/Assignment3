let mongoose = require('mongoose');

let assignmentModel = mongoose.Schema({
    Title: String,
    DueDate: String,
    Description: String,
    Subject: String
    },
    {
        collection: "assignments"
    }
);

module.exports = mongoose.model('Assignments', assignmentModel);

// Required modules and setup
var express = require('express');
var router = express.Router();
let Assignments = require('../models/assignments.js');

// DisplayAssignmentList: Retrieves and displays a list of assignments
module.exports.DisplayAssignmentList = async (req, res, next) => {
    try {
        var AssignmentList = await Assignments.find();
        // Render the assignment list view with the retrieved list
        res.render('assignment/list', {
            title: 'Assignment List', 
            AssignmentList: AssignmentList
        });
    } catch (err) {
        console.error(err);
        // Render the error message if there's an issue fetching the list
        res.render('assignment/list', {
            error: 'Error on server'
        });
    }
};

// AddAssignment: Renders the form to add a new assignment
module.exports.AddAssignment = async (req, res, next) => {
    try {
        // Render the assignment add view
        res.render('assignment/add', {
            title: 'Add Assignment'
        });
    } catch (err) {
        console.error(err);
        // Render the error message if there's an issue
        res.render('assignment/list', {
            error: 'Error on the server'
        });
    }
};

// ProcessAssignment: Processes the form submission for adding a new assignment
module.exports.ProcessAssignment = async (req, res, next) => {
    try {
        let newAssignment = Assignments({
            "Title": req.body.Title,
            "DueDate": req.body.DueDate,
            "Description": req.body.Description,
            "Subject": req.body.Subject
        });
        // Save the new assignment and redirect to the list
        Assignments.create(newAssignment).then(() => {
            res.redirect('/assignmentslist');
        });
    } catch (error) {
        console.error(error);
        // Render the error message if there's an issue processing the form
        res.render('assignment/list', {
            error: 'Error on the server'
        });
    }
};

// EditAssignment: Renders the form to edit an existing assignment
module.exports.EditAssignment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const assignmentToEdit = await Assignments.findById(id);
        // Render the assignment edit view with the current assignment data
        res.render('assignment/edit', {
            title: 'Edit Assignment',
            Assignment: assignmentToEdit
        });
    } catch (error) {
        res.render('assignment/list', {
            error: 'Error on the server'
        });
    }
};

// ProcessEditAssignment: Processes the form submission for editing an assignment
module.exports.ProcessEditAssignment = async (req, res, next) => {
    try {
        const id = req.params.id;
        let updatedAssignment = {
            "_id": id,
            "Title": req.body.Title,
            "DueDate": req.body.DueDate,
            "Description": req.body.Description,
            "Subject": req.body.Subject
        };
        // Update the assignment and redirect to the list
        Assignments.findByIdAndUpdate(id, updatedAssignment).then(() => {
            res.redirect('/assignmentslist');
        });
    } catch (error) {
        res.render('assignment/list', {
            error: 'Error on the server'
        });
    }
};

// DeleteAssignment: Handles the deletion of an assignment
module.exports.DeleteAssignment = async (req, res, next) => {
    try {
        let id = req.params.id;
        // Delete the assignment and redirect to the list
        Assignments.deleteOne({ _id: id }).then(() => {
            res.redirect('/assignmentslist');
        });
    } catch (error) {
        res.render('assignment/list', {
            error: 'Error on the server'
        });
    }
};

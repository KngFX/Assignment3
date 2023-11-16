var express = require('express');
var router = express.Router();
let Assignments = require('../models/assignments.js');

module.exports.DisplayAssignmentList = async (req, res, next) => {
    try {
        var AssignmentList = await Assignments.find();
        res.render('assignment/list', {
            title: 'Assignment List', 
            AssignmentList: AssignmentList
        });
    } catch (err) {
        console.error(err);
        res.render('assignment/list', {
            error: 'Error on server'
        });
    }
};

module.exports.AddAssignment = async (req, res, next) => {
    try {
        res.render('assignment/add', {
            title: 'Add Assignment'
        });
    } catch (err) {
        console.error(err);
        res.render('assignment/list', {
            error: 'Error on the server'
        });
    }
};

module.exports.ProcessAssignment = async (req, res, next) => {
    try {
        let newAssignment = Assignments({
            "Title": req.body.Title,
            "DueDate": req.body.DueDate,
            "Description": req.body.Description,
            "Subject": req.body.Subject
        });
        Assignments.create(newAssignment).then(() => {
            res.redirect('/assignmentslist');
        });
    } catch (error) {
        console.error(error);
        res.render('assignment/list', {
            error: 'Error on the server'
        });
    }
};

module.exports.EditAssignment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const assignmentToEdit = await Assignments.findById(id);
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
        Assignments.findByIdAndUpdate(id, updatedAssignment).then(() => {
            res.redirect('/assignmentslist');
        });
    } catch (error) {
        res.render('assignment/list', {
            error: 'Error on the server'
        });
    }
};

module.exports.DeleteAssignment = async (req, res, next) => {
    try {
        let id = req.params.id;
        Assignments.deleteOne({ _id: id }).then(() => {
            res.redirect('/assignmentslist');
        });
    } catch (error) {
        res.render('assignment/list', {
            error: 'Error on the server'
        });
    }
};

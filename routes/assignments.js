var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

let Assignments = require('../models/assignments.js');
let AssignmentsController = require('../controllers/assignments.js');

// Read Operation
router.get('/', AssignmentsController.DisplayAssignmentList);
/* Get route for Add Assignment page --> Create */
router.get('/add', AssignmentsController.AddAssignment); 
/* Post route for Add Assignment page --> Create */
router.post('/add', AssignmentsController.ProcessAssignment);
/* Get route for displaying the Edit Assignment page --> Update */
router.get('/edit/:id', AssignmentsController.EditAssignment);
/* Post route for processing the Edit Assignment page --> Update */
router.post('/edit/:id', AssignmentsController.ProcessEditAssignment);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', AssignmentsController.DeleteAssignment);
module.exports = router;

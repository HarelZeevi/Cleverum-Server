const express = require("express");


const middleware = require('./../middlewares/general.middleware')
const validator = require('./../validations/general.validation')
const helpers = require('./../helpers/general.helpers')

// controllers 
const studentController = require('./../controller/student.controller');
const teacherController = require('./../controller/teacher.controller');
const generalController = require('./../controller/general.controller')


/* API routes*/

/* app possible methods:
    app.get(path, callback function - the called function in response)       -> getting information
    app.post()      -> adding new info
    app.put()       -> updating info
    app.delete()    -> deleting info
*/

const app = express();



// exporting routes
module.exports = (app) => {
   
	/* simple test message */
	app.get('/', (req, res) => {
		res.send("<h1>Welcome to Node.js Cleverum Server!</h1>");
		console.log('New Client asked for / and got Welcome!');
	});


	/* general user api calls */ 
	
	// sign in - returns student object
	app.post('/api/signIn', (req, res) => generalController.signIn(req, res));

	// register to the app 
	app.post('/api/register', (req, res) => generalController.register(req, res));

	
	
	/* teacher api calls */ 
    
	// get a list of all the tests that belong to a pecifc teacher 
	app.get('/api/teacher/getTests', middleware.authJwt, (req, res) => teacherController.getTests(req, res));
    
   	// upload test 	
    	app.post('/api/teacher/uploadDocument', middleware.authJwt, (req, res) => teacherController.uploadDocument(req, res));
	
	// create test 
	app.post('/api/teacher/createTest', middleware.authJwt, (req, res) => teacherController.createTest(req, res));

	// remove  test 
	app.delete('/api/teacher/removeTest', middleware.authJwt, (req, res) => teacherController.removeTest(req, res));
	
	// get screenshot 
	app.post('/api/teacher/getScreenshot', middleware.authJwt, (req, res) => teacherController.getScreenshot(req, res));

	// start the test and create a usable live instace of the created test
	app.post('/api/teacher/startTest', middleware.authJwt, (req, res) => teacherController.startTest(req, res));
    
	// get all of the participants in a specifc live test 
	app.post('/api/teacher/getParticipants', middleware.authJwt, (req, res) => teacherController.getParticipants(req, res));
    
	// dowload the uploaded test document 
	app.get('/api/teacher/getTestDocument', middleware.authJwt, (req, res) => teacherController.getTestDocument(req, res));

	

	/* student api calls */	
    
	// enter the test
	app.get('/api/student/enterTest', middleware.authJwt, (req, res) => studentController.enterTest(req, res));

	// get test document
	app.get('/api/student/getTestDocument', middleware.authJwt, (req, res) => studentController.getTestDocument(req, res));

	// submit the tests document 	
	app.post('/api/student/submitTestDocument', middleware.authJwt, (req, res) => studentController.submitTestDocument(req, res));

}

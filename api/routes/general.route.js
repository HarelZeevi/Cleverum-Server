const express = require("express");


const middleware = require('./../middlewares/general.middleware')
const validator = require('./../validations/general.validation')
const helpers = require('./../helpers/general.helpers')

// controllers 
const teacherController = require('./../controller/student.controller');
const studentController = require('./../controller/teacher.controller');
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
    // sign in - returns student object
    app.post('/api/signIn', (req, res) => generalController.signIn(req, res));

}
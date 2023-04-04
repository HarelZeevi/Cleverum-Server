const studentDB = require("./../database/student.database")
const con = require("../database/connect.database");
const helpers = require("../helpers/general.helpers")


// download the test document to the student's pc 
const getTestDocument = (req, res) => {
    // if not a student -> disallow 
    if (!(req.tokenData.userType === 2)) {
        res.status(500).send("You are not allowed to do this action!");
	}
    
    const accessToken = req.body.accessToken;
    const testId = req.body.testId;
    const filename = req.body.filename;

    // send the file as base64 string
    let path = process.env.BASE_UPLOADS + `/${escape(teacherId)}/${escape(testId)}/${escape(filename)}`
    console.log(path)
    let file = helpers.fileToBase64(path) 
    res.send({"file": file})
}


// getting the teacher's ip and the document filename
const enterTest = (req, res) => {
    // if not a student -> disallow 
    if (!(req.tokenData.userType === 2)) {
        res.status(500).send("You are not allowed to do this action!");
	}


    const testId = req.body.testId;
    studentDB.enterTest(req, res, testId)
    
}


// uploading back the test docuemnt
const submitTestDocument = (req, res) => {
    return
}


module.exports = {
    enterTest, 
    getTestDocument,
    submitTestDocument
}

const teacherDB = require("./../database/teacher.database")
const con = require("../database/connect.database");
const helpers = require("../helpers/general.helpers")
const fs = require('fs')
const ipaddr = require('ipaddr.js');


// this function allows the teacher to upload the word document for a created test
const uploadDocument = (req, res) => {
    
    // if not a teacher -> disallow 
    if (!(req.tokenData.userType === 2)) {
        res.status(500).send("You are not allowed to do this action!");
    }

    
    // file as base 64 
    const base64file = req.body.base64file;
    const filename = req.body.filename;
    const teacherId = req.tokenData.id;
    const testId = req.body.testId;

    // create folder for the test 
    const dir = process.env.BASE_UPLOADS + `/${escape(teacherId)}/${escape(testId)}/`
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
    
    // save file from base 64
    helpers.saveDocxFromBase64(base64file, dir + escape(filename));
   
    teacherDB.saveDocName(res, testId, teacherId, filename);
}



const getTests = (req, res) => {
    console.log(req.tokenData.userType)
    // if not a teacher -> disallow 
    if (!(req.tokenData.userType === 2)) {
        return res.status(500).send("You are not allowed to do this action!");
	}

	const id = req.tokenData.id;
	teacherDB.getTests(res, id);
}


const createTest = (req, res) => {
    // if not a teacher -> disallow 
    if (!(req.tokenData.userType === 2)) {
        return res.status(500).send("You are not allowed to do this action!");
    }

	const id = req.tokenData.id;
	const topic = req.body.topic;
	const subtopic = req.body.subtopic; 
	const timeLimit = req.body.timeLimit; 
	const grade = req.body.grade;

	teacherDB.createTest(res, id, topic, subtopic, timeLimit, grade); 
}


const removeTest = (req, res) => {
    // if not a teacher -> disallow 
    if (!(req.tokenData.userType === 2)) {
        return res.status(500).send("You are not allowed to do this action!");
	}
		
	const id = req.tokenData.id;
	const testId = req.body.testId; 

    // remove test folder if exists
    const dir = process.env.BASE_UPLOADS + `/${escape(id)}}/${escape(testId)}/`
    
    if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, {
            recursive: true
        });
    }

	teacherDB.removeTest(res, id, testId) 
}


const startTest = (req, res) => {
    // if not a teacher -> disallow 
    if (!(req.tokenData.userType === 2)) {
        res.status(500).send("You are not allowed to do this action!");
	}

	const id = req.tokenData.id;	
	const testId = req.body.testId; 
    const ip = ipaddr.process(req.ip).toString();
    const token = helpers.generateRandomString(8);
    console.log(id, testId, ip, token) 
	teacherDB.startTest(res, id, testId, ip, token);
}


const getParticipants = (req, res) => {
    // if not a teacher -> disallow
    if (!(req.tokenData.userType === 2)) {
        res.status(500).send("You are not allowed to do this action!");
	}

	const id = req.body.id;	
	const instanceId = req.body.instanceId; 

	teacherDB.getParticipants(res, id, instanceId);
}


const getTestDocument = (req, res) => {
    // if not a teacher -> disallow 
    if (!(req.tokenData.userType === 2)) {
        res.status(500).send("You are not allowed to do this action!");
	}
        
    const teacherId = req.tokenData.id;
    const testId = req.body.testId;
    const filename = req.body.filename;
    
    // send the file as base64 string
    let path = process.env.BASE_UPLOADS + `/${escape(teacherId)}/${escape(testId)}/${escape(filename)}`
    console.log(path)
    let file = helpers.fileToBase64(path) 
    res.send({"file": file})
}



module.exports = {
	getTests,
	createTest,
    uploadDocument,
	removeTest,
	startTest,
	getParticipants,
	getTestDocument
}




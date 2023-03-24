const teacherDB = require("./../database/teacher.database")
const con = require("../database/connect.database");

// this function allows the teacher to upload the word document for a created test
const uploadDocuemnt = (req, res) => {
    // if not a teacher -> disallow 
    if (!(req.tokenData.userType === "S")) {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
        });
       res.end("You are not allowed to do this action!");
	}

    console.log(reg.files)
    // file name 
    const file = req.body.files
    console.log(file)
}

const getTests = (req, res) => {
	// if not a teacher -> disallow 
    if (!(req.tokenData.userType === "S")) {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
        });
       res.end("You are not allowed to do this action!");
	}

	const id = req.tokenData.id;
	teacherDB.getTests(res, id);
}


const createTest = (req, res) => {
    // if not a teacher -> disallow 
    if (!(req.tokenData.userType === "S")) {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
        });
        res.end("You are not allowed to do this action!");
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
    if (!(req.tokenData.userType === "S")) {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
        });
        res.end("You are not allowed to do this action!");
	
	}
		
	const id = req.tokenData.id;
	const testId = req.body.testId; 

	teacherDB.removeTest(res, id, testId) 
}


const startTest = (req, res) => {
    // if not a teacher -> disallow 
    if (!(req.tokenData.userType === "S")) {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
        });
        res.end("You are not allowed to do this action!");
	}

	const id = req.body.id;	
	const testId = req.body.testId; 

	teacherDB.startTest(res, id, testId);
}


const getParticipants = (req, res) => {
    // if not a teacher -> disallow 
    if (!(req.tokenData.userType === "S")) {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
        });
        res.end("You are not allowed to do this action!");
	}

	const id = req.body.id;	
	const instanceId = req.body.instanceId; 

	teacherDB.getParticipants(res, id, instanceId);
}


const getTestDocument = (req, res) => {
    // if not a teacher -> disallow 
    if (!(req.tokenData.userType === "S")) {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
        });
        res.end("You are not allowed to do this action!");
	}

	return; 
	
}


module.exports = {
	getTests,
	createTest,
	uploadDocuemnt,
	removeTest,
	startTest,
	getParticipants,
	getTestDocument
}




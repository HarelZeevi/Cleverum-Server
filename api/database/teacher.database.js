const fs = require("fs")
const mysql = require('mysql');
const con = require('./connect.database')

// service commands file 
const service = require('./../services/general.service')


// image profile upload 
const uploadProfileImage = (res, studentId, docData) => {
    let uploadPath = "./../../../../tests" + studentId;
    let imgType;
    
    // check file extension 
    let fileExtension = docData.split('.')[1]
    if (fileExtension === "docx" || fileExtension === "doc") {
        console.log("Estension: " + fileExtension);
        
        fs.writeFile(
            uploadPath,
            docData,
            fileExtension,
            err => console.log("Error: " + err)
        );
    }
    else {
        res.writeHead(200, {"Access-Control-Allow-Origin": "http://localhost:3000",});
        res.end("Invalid file extension! only doc / docs is allowed");
        return;
    }

    uploadPath += imgType;

    console.log(uploadPath);
    console.log("Image approved!");
    let sqlQuery = `UPDATE students SET imgFileExt = ${mysql.escape(imgType)} WHERE id = ${mysql.escape(studentId)};`;
    console.log(sqlQuery);
    con.query(sqlQuery, (err, result) => {
        service.checkActionDone(result, err, res);
    });

};


// get tests 
const getTests = (res, id) => {
	let sqlQuery = `SELECT * FROM tests WHERE teacherid = ${mysql.escape(id)}`;
	
    con.query(sqlQuery, (err, result) => {
        service.getResultObject(result, err, res);
    });
} 

// create test 
const createTest = (res, id, topic, subtopic, timeLimit, grade) => {
	let sqlQuery = `INSERT INTO tests (teacherid, topic, subtopic, timelimit, grade) 
					VALUES (${mysql.escape(id)}, ${mysql.escape(topic)}, ${mysql.escape(subtopic)}, ${mysql.escape(timeLimit)}, ${mysql.escape(grade)})`;
	
    con.query(sqlQuery, (err, result) => {
    	service.checkActionDone(result, err, res);
	});
}

// remove test 
const removeTest = (res, id, testId) => {
	let sqlQuery = `DELETE FROM tests WHERE teacherId = ${mysql.escape(id)} and id = ${mysql.escape(testId)}`;	
    con.query(sqlQuery, (err, result) => {
        service.checkActionDone(result, err, res);
    });
} 

module.exports = {
	getTests,
	createTest,
	removeTest

}

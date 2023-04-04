const mysql = require('mysql');
const con = require('./connect.database')
const helpers = require('./../helpers/general.helpers')

// service commands file 
const service = require('./../services/general.service')



// save test's file name 
const saveDocName = (res, testId, teacherId, filename) => {
    // save file name in test record 
    
    let sqlQuery = `UPDATE tests SET filename=${mysql.escape(filename)} 
                    WHERE id=${testId} AND teacherId=${teacherId}`;
	
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
    console.log(sqlQuery)
    con.query(sqlQuery, (err, result) => {
        service.checkActionDone(result, err, res);
    });
} 



// generate test instance and save it's token
const startTest = (res, id, testId, ip, token) => {
    
    let sqlQuery = `INSERT INTO test_instances (id, accessToken, classId, testId, doneDate, startedHour, serverIp)
                    VALUES (NULL, ${mysql.escape(token)}, NULL, ${mysql.escape(testId)}, NULL, NULL, ${mysql.escape(ip)})`
    

    const tokenObj = {"accessToken": token} 
    con.query(sqlQuery, (err, result, tokenObj) => {
        service.startTest(result, err, res, tokenObj);
    });
}     



module.exports = {
	saveDocName,
    getTests,
	createTest,
	removeTest,
    startTest
}

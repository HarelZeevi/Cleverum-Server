const mysql = require('mysql');
const con = require('./connect.database')

// service commands file 
const service = require('./../services/general.service')



// get the test's filename and the teacher's ip 
const getTestData = (accessToken, res, req, callback) => {
    
    let sqlQuery = `SELECT tests.filename, tests.teacherId, test_instances.serverIp, test_instances.testId 	
					FROM tests
                    INNER JOIN test_instances ON tests.id = test_instances.testid
                    WHERE test_instances.accessToken = ${mysql.escape(accessToken)} `;
    
    

    con.query(sqlQuery, (err, result) => {
		callback(result, res, req, err);
    });
}


const getDocumentName = (testId, callback) => {
    
    let sqlQuery = `SELECT tests.filename FROM tests
                    
                    INNER JOIN test_instances ON tests.id = test_instances.testid 
                    
                    WHERE test_instences`


}


const enterTest = (req, res, accessToken) => {
     let sqlQuery = `SELECT tests.filename, test_instances.serverIp
					FROM tests
                    INNER JOIN test_instances ON tests.id = test_instances.testid
                    WHERE test_instances.accessToken = ${mysql.escape(accessToken)} `;
    
	con.query(sqlQuery, (err, result) => {
		service.getResultObject(result, err, res);
	}) 
}


module.exports = {
	getTestData,
	enterTest,
	getDocumentName
}

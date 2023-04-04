const mysql = require('mysql');
const con = require('./connect.database')

// service commands file 
const service = require('./../services/general.service')



// get the test's filename and the teacher's ip 
const enterTest = (testId, accessToken) => {
    
    let sqlQuery = `SELECT tests.filename, test_instances.serverIp FROM tests
                    
                    INNER JOIN test_instances ON  tests.id = test_instances.testid
                        
                    WHERE test_instances.accessToken = ${mysql.escape(accessToken)} `;
    
    

    con.query(sqlQuery, (err, result) => {
    	service.getResultObject(result, err, res);
    });
}




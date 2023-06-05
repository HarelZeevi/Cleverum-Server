const mysql = require('mysql');
const con = require('./connect.database')
const helpers = require('./../helpers/general.helpers')
const bcrypt = require('bcryptjs')

// service commands file 
const service = require('./../services/general.service')


// adding user to the system 
const register = (res, id, userType, fullname, email, gender, password, confirmPassword) => {
    
    // add validations

    helpers.hashPassword(password, (err, hash) => {
        // in case of an error in the hashing process 
        if (err)
            service.checkActionDone(NULL, err, res);

        let sqlQuery = `INSERT INTO users
                                (
                                    id,
                                    userType,
                                    profileImg,	 
                                    imgExtension,
                                    fullname,
                                    gender,
                                    email,
                                    pswd,
                                    token,
                                    expiration
                                )
                                VALUES 
                                (
                                    ${mysql.escape(id)},
                                    ${mysql.escape(userType)},
                                    NULL, 
                                    NULL,
                                    ${mysql.escape(fullname)},
                                    ${mysql.escape(gender)},
                                    ${mysql.escape(email)},
                                    ${mysql.escape(hash)},
                                    NULL,
                                    NULL
                                )`

	     
		// query the user into the DB	
        con.query(sqlQuery, (err, result) => {
        	if (err)
				res.status(500).send(err);
		})
		

		// tokenize user data into JWT 
		userData = {
			"id": id, 
			"userType": userType, 
			"fullname": fullname,
			"pswd": pswd,
			"gender": gender,
			"email": email
		}
        
       	service.checkSignUp(result, err, res);
    })
}


const signIn = (res, id, password) => {
    // creating jwt
    let sqlQuery = `SELECT id, userType, fullname, pswd, gender, email
                      FROM users 
                      WHERE id = ${mysql.escape(id)};`;
   
    
    console.log("service", service)

    con.query(sqlQuery, (err, result) => {
    
        if (err || Object.keys(result).length === 0) // error user was not found
            service.checkActionDone(result, err, res);

        // valid user was found and it matches the given id  
        else {
            // compare the hash on the db with the given password
            const hash = result[0].pswd;
            const resultObj = result;
            console.log(resultObj)

            bcrypt.compare(password, hash, (err, result) => {
                console.log(resultObj)
                service.signJwt(result, resultObj, err, res);
            });
        }

    });
}


module.exports = {
    signIn,
    register
}

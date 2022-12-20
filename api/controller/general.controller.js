// database query files 
const studentDB = require("./../database/student.database")
const teacherDB = require("./../database/teacher.database")
const generalDB = require("./../database/general.database");
const con = require("../database/connect.database");

// user Sign in function
const signIn = (req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    const password = req.body.password;
    if (false && (validator.testData(password, 2) !== 0 || validator.testData(id, 5) !== 0)) {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
        });
        res.end("Invalid Username!");
        return;
    }
    generalDB.signIn(res, id, username, password);
}


// register - add user 
const register = (req, res) => {
    const id = req.body.id;
    const userType = req.body.userType;
    const fullname = req.body.firstName + req.body.lastName;
    const gender = req.body.gender;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    // add validations 
    generalDB.register(res, id, userType, fullname, email, gender, password, confirmPassword);
}



module.exports = {
    signIn,
    register
}
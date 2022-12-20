// database query files 
const studentDB = require("./../database/student.database")
const teacherDB = require("./../database/teacher.database")
const generalDB = require("./../database/general.database")

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


module.exports = {
    signIn
}
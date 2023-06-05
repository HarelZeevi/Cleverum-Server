// database query files 
const studentDB = require("./../database/student.database")
const teacherDB = require("./../database/teacher.database")
const generalDB = require("./../database/general.database");
const con = require("../database/connect.database");
const fs = require('fs')



// user Sign in function
const signIn = (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    // validations here
    generalDB.signIn(res, id, password);
}



// register - add user 
const register = (req, res) => {
    const id = req.body.id;
    const userType = req.body.userType;
    const fullname = req.body.firstName + " " + req.body.lastName;
    const gender = req.body.gender;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log(id, userType, fullname, email, gender, password, confirmPassword) 
    
    // if user type is a teacher - create an empty folder fot the teacher's test 
    const dir = process.env.BASE_UPLOADS + `/${id}/`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
    else {
        res.send('user already exists!')
    }

    // add validations 
    generalDB.register(res, id, userType, fullname, email, gender, password, confirmPassword);
}


module.exports = {
    signIn,
    register
}

const bcrypt = require('bcrypt')

// this function hashes a given password and return it 
hashPassword = (plainPass, callback) => {
    const saltRounds = 10;
    bcrypt.hash(plainPass, saltRounds, (err, hash) => {
            callback(err, hash);
    });
}



module.exports = {
    hashPassword
}
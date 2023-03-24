const bcrypt = require('bcrypt')
const fs = require('fs');
const path = require('path');
const base64 = require('base64-js');
const atob = require('atob');



// this function hashes a given password and return it 
const hashPassword = (plainPass, callback) => {
    const saltRounds = 10;
    bcrypt.hash(plainPass, saltRounds, (err, hash) => {
            callback(err, hash);
    });
}



const saveDocxFromBase64 = (base64Str, savePath) => {
    // convert the base64 string to a byte array
    const byteCharacters = atob(base64Str);

    // convert the byte array to a buffer
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
     const fileBuffer = Buffer.from(byteNumbers);

    // write the buffer to the file
    const extension = path.extname(savePath).toLowerCase();
    if (extension === '.doc' || extension === '.docx') {
        fs.writeFileSync(savePath, fileBuffer);
        console.log(`Saved ${extension} file to ${savePath}`);
    } else {
        console.error('Invalid file extension. Must be .doc or .docx');
    }
}



const fileToBase64 = filePath => {

  // read the file contents as a buffer
  const fileBuffer = fs.readFileSync(filePath);

  // convert the buffer to a base64-encoded string
  const base64Str = fileBuffer.toString('base64');

  // return the base64-encoded string
  return base64Str;
}



module.exports = {
    hashPassword,
    saveDocxFromBase64,
    fileToBase64
}

const bcrypt = require('bcryptjs')
const fs = require('fs');
const path = require('path');
const base64 = require('base64-js');
const atob = require('atob');
const os = require('os');


// this function hashes a given password and return it 
const hashPassword = (plainPass, callback) => {
    const saltRounds = 10;
    bcrypt.hash(plainPass, saltRounds, (err, hash) => {
            callback(err, hash);
    });
}



// get local ip address in case of local host
const getLocalIP = () =>  {
 	const interfaces = os.networkInterfaces();
  	for (const iface of Object.values(interfaces)) {
    	for (const connection of iface) {
      		if (connection.family === 'IPv4' && !connection.internal) {
        		return connection.address;
      		}
    	}
  	}
  	return 'Unknown IP';
}

const localIP = getLocalIP();
console.log(`Local IP address: ${localIP}`);

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


/**
 * Generates a random string of the given length containing letters (uppercase or not) and numbers.
 * @param {number} length - The length of the random string to generate.
 * @returns {string} A random string of the given length containing letters and numbers.
 */
const generateRandomString = length => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


module.exports = {
    hashPassword,
    saveDocxFromBase64,
    fileToBase64,
    generateRandomString,
	getLocalIP
}

/* Here goes eveything related to returning data to the user by sending response to him */
const jwt = require("jsonwebtoken")
//const db = require('./../database/general.database')

// returning result of get data request
function getResultObject(result, err, res) {
    if (err) {
        console.log(err);
        res.status(500).send("Error! " + err);
    } else {
        console.log("Query was successfully executed!");
        console.log(result);
        if (Object.keys(result).length != 0) {
           res.send(JSON.stringify(result));
        } else {
            res.status(500).send("Not found");
            console.log("We didnt find what you are looking for...")
        }
    }
    return result;
}



// returning result of get data request
function startTest(result, err, res) {
    if (err) {
        console.log(err);
        res.status(500).send("Error! " + err);
    } else {
        console.log("Query was successfully executed!");
        console.log(result);
        if (Object.keys(result).length != 0) {
           res.send(JSON.stringify(result));
        } else {
            res.status(500).send("Not found");
            console.log("We didnt find what you are looking for...")
        }
    }
    return result;
}





// checking if signup was done correctly, than sign in
function checkSignUp(result, err, res) {
    if (err) {
        console.log(err);
        res.status(500).send("error: " + err);
        return;
    } else {
        console.log("Query was successfully executed!");
        console.log(result);
        
        // user was created
        if (Object.keys(result).length != 0) {
            signJwt(true, result, err, res);
            return;
        }

        else {
            console.log("Not found In Database!");
            res.status(500).send("Not found In Database!");

        }
    }
    return result;
}


// checking if a certain action was done without any errors
function checkActionDone(result, err, res) {
    if (err) {
        console.log(err);
        res.status(500).send("error: " + err);
        return;
    } else {
        console.log("Query was successfully executed!");
        console.log(result);
        if (Object.keys(result).length != 0) {
            res.send("Done successfully!");
        } else {
            console.log("Not found In Database!");
            res.status(500).send("Not found In Database!");

        }
    }
    return result;
}


// returning result of get data requesti without sending it to the client
function getResultNoSend(result, err, callback) {
    if (err) {
        console.log(err);
        callbac(null, err) 
    } else {
        console.log("Query was successfully executed!");
        console.log(result);
        if (Object.keys(result).length != 0) {
           callback(JSON.stringify(result), null);
        } else {
            callback(null, "Not found");
            console.log("We didnt find what you are looking for...")
        }
    }
}


// send to user sing in json-web-token access if authenticated 
const signJwt = (result, resultObj, err, res) => {
    console.log(resultObj)
    if (!result) {
        // invalid password
        res.status(500).send("Invalid id / password!");
        return;
    }
    if (err) {
        console.log(err);
        res.status(500).send("Error: " + err);
        throw err;
    } else {
        console.log("Query was successfully executed!");
        console.log(resultObj)
        if (Object.keys(resultObj).length != 0) // if result accepted 
        {
            let user = Object.values(JSON.parse(JSON.stringify(resultObj)))[0];
            
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

            res.send(JSON.stringify({
                accessToken: accessToken
            }))
        } else {
            console.log("not found");
            res.status(500).send("not found")
        }
    }
    return resultObj;
}


module.exports = {
    getResultObject,
    checkSignUp,
    checkActionDone,
    startTest,
    signJwt
}

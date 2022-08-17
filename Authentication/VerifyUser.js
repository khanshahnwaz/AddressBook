const jwt = require('jsonwebtoken');
const jwt_secret = "IamShahnwazKhan";

const verifyUser = (req, res, next) => {

    const token = req.header('auth-token');

    try {
        // verify if it is valid token 
        const data = jwt.verify(token, jwt_secret);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send("Please login with correct credentials.")
    }
}


module.exports = verifyUser;
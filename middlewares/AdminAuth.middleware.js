const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        try {
            const decode = jwt.verify(token, "masai");
            if (decode) {
                if (decode.isAuth === true) {
                    next();
                }
                else {
                    return res.status(401).json({ "msg": "You are not authorized!" });
                }
            } else {
                res.status(401).json({ "msg": "You are not authorized!" });
            }
        }
        catch (err) {
            res.status(401).json({ "msg": "You are not authorized!", "error": err.message });
        }
    } else {
        res.status(401).json({ "msg": "You are not authorized!" });
    }
}

module.exports = {
    auth
}
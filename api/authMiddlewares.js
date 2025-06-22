const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const { token } = req.cookies;
    console.log("TOKEN FROM COOKIE:", token);
    if (!token) return res.status(401).json({ error: 'Unauthorized - No token' });

    jwt.verify(token, 'praveen secret', (err, userInfo) => {
        if (err) return res.status(403).json({ error: 'Forbidden - Invalid token' });
        req.user = userInfo;
        next();
    });
}

module.exports = authenticateToken
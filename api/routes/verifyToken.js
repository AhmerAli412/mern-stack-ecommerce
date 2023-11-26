const jwt = require("jsonwebtoken");

// FOR ALL USER

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // change "token" to "authorization"
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        console.error('Error verifying token:', err);
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      console.log('Decoded User:', user); // Log the decoded user for debugging
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};


// FOR USER and ADMIN

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

// FOR ADMIN

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      console.error('User is not an admin:', req.user);
      res.status(403).json("You are not allowed to do that!");
    }
  });
};


module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};

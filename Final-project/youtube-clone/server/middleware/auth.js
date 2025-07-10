const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader); // ✅ ADD THIS

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // ✅ ADD THIS

    if (!decoded || (!decoded.id && !decoded._id)) {
      return res.status(401).json({ message: "Unauthorized: Invalid token payload" });
    }

    req.user = { userId: decoded.id || decoded._id };
    next();
  } catch (err) {
    console.error("JWT Verification failed:", err.message);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};


module.exports = authenticate;

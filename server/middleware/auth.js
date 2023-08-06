import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    console.log(">>> 1")
    let token = req.header("Authorization")
    
    console.log(">>> 2", token)
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    
    console.log(">>> 3")
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    console.log(">>> 4", token)

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    console.log(">>> success")
    next();

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const jwt = require("jsonwebtoken");
export {};
const verifyToken = (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;

  if (!token) return res.redirect("/login");
  jwt.verify(token, process.env.TOKEN_SECRET, (err: any, decodedToken: any) => {
    if (err) return res.redirect("/login");
    console.log(decodedToken);
    next();
  });
};

export default verifyToken;

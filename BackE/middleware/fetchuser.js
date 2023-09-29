var jwt = require("jsonwebtoken");
const JWT_SECRET = "helloinsideMERNtoDay"
const fetchuser = (req, res, next) => {
  //get user from jwt token
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: "please authenticate token" });
  }
    try {
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
      // res.send(user);
      next();
    } catch (error) {
      res.status(401).send({ error: "please authenticate" });
    }
}

//paste the JWT_SECRET (authtoken) in the header section of thunderclient before sending 
//used for securing the data
module.exports = fetchuser;
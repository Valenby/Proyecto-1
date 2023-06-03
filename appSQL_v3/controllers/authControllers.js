// aca va en token para el login

const JWT = require("jsonwebtoken");

const { User } = require("../models");

exports.signIn = async (req, res) => {
  console.log("Auth -> signIn", req.body);
  
  try {
    const { username, password } = req.body;
    const user = await User.login(username, password);
    
    console.log(user)

    if(!user) {
      res.json({error: "user / password combination does not exists"});
      return
    }
    
    const token = JWT.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    )
    
    res.json({token, email: user.email, name: user.name });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
};

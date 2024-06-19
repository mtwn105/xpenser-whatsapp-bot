import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');

const generateToken = (payload: any) => {
  // Create a JWT token and login user
  const options = {
    expiresIn: '1h', // Token will expire in 1 hour
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
  return token;
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  //get token from request header

  const authHeader = req.headers["authorization"]
  if (!authHeader) {
    return res.status(401).send({
      error: "Missing Token",
      message: "Missing Token",
    });
  }

  const token = authHeader.split(" ")[1]
  //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  if (token == null) {
    return res.status(401).send({
      error: "Missing Token",
      message: "Missing Token",
    })
  }
  if (token == process.env.APP_TOKEN) {
    next();
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err: Error) => {
    if (err) {
      return res.status(401).send({
        error: "Token Invalid",
        message: "Token Invalid",
      })
    }
    next() //proceed to the next action in the calling function
  }) //end of jwt.verify()
}

const getUser = (token: string) => {
  const user = jwt.decode(token);
  return user
}

module.exports = {
  generateToken,
  validateToken,
  getUser
}
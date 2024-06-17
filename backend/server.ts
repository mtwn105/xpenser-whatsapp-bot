import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const axios = require("axios").default;
const connectDB = require("./db");
const expressStaticGzip = require("express-static-gzip");
const { xss } = require("express-xss-sanitizer");
const { verify } = require("jsonwebtoken");

const expensesRouter = require("./routes/expenses");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

require("dotenv").config();

connectDB();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(xss());
app.use(cors());
app.use(morgan(':date[iso] :remote-addr - :remote-user :method :url HTTP/:http-version :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'));

app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin-allow-popups" }));
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.ieNoOpen());
app.use(
  helmet.frameguard({
    action: "sameorigin",
  })
);
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());


app.use("/api/expenses", expensesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);


app.get(
  "*.*",
  expressStaticGzip("public/client", { serveStatic: { maxAge: "1y" } })
);

// serve frontend paths
app.all("*", function (req: Request, res: Response) {
  res.status(200).sendFile(`/`, { root: "public/client" });
});

// // auth filter to validate jwt token
// app.use(async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ error: "No token provided" });
//   }
//   try {
//     const decoded = verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
//   return;
// });


// Error Handler
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error("Not Found - " + req.originalUrl);
  next(error);
};

const errorHandler = (err: Error, req: Request, res: Response) => {
  res.status(res.statusCode || 500);
  res.json({
    error: err.name,
    message: err.message,
  });
};

app.use(notFound);
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Xpenser server is listening on ${port}`);
});

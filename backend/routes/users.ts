import { NextFunction, Request, Response } from "express";
import IUser from "../interfaces/user";

const express = require("express");
const usersRouter = express.Router();

const { User } = require("../schemas");


usersRouter.get("/:userId", async (req: Request, res: Response) => {

  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});


module.exports = usersRouter;
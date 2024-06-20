import { NextFunction, Request, Response } from "express";
import IUser from "../interfaces/user";

const express = require("express");
const usersRouter = express.Router();
const { getUser } = require("../jwt")

const { User } = require("../schemas");


usersRouter.get("/:userId", async (req: Request, res: Response) => {

  try {
    const userId = req.params.userId;

    const token = req.headers['authorization']?.split(" ")[1]
    const authUser = getUser(token);

    if (userId != authUser?.id && authUser?.role !== "admin") {
      return res.status(403).send({
        error: "You are not authorized",
        message: "You are not authorized"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        error: "User not found",
        message: "User not found",
      });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

usersRouter.get("/byPhoneNumber/:phonenumber", async (req: Request, res: Response) => {

  try {

    const token = req.headers['authorization']?.split(" ")[1]
    const authUser = getUser(token);

    if (authUser?.role !== "admin") {
      return res.status(403).send({
        error: "You are not authorized",
        message: "You are not authorized"
      });
    }

    const phonenumber = req.params.phonenumber;
    const user = await User.findOne({ whatsappNumber: phonenumber });
    if (!user) {
      return res.status(404).send({
        error: "User not found",
        message: "User not found",
      });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});


module.exports = usersRouter;
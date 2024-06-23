import { NextFunction, Request, Response } from "express";
import IUser from "../interfaces/user";

const express = require("express");
const authRouter = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const otpServiceId = process.env.TWILIO_VERIFY_SERVICE_ID;
const client = require('twilio')(accountSid, authToken);

const { User } = require("../schemas");
const { generateToken } = require("../jwt");

// create user
authRouter.post("/otp/send", async (req: Request, res: Response) => {
  try {
    const verification = await client.verify.v2.services(otpServiceId)
      .verifications
      .create({ to: req.body.phonenumber, channel: 'sms' });
    return res.status(200).json({
      message: "OTP sent successfully"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      error: "Something went wrong",
      message: "Something went wrong",
    });
  }
});

authRouter.post("/otp/verify", async (req: Request, res: Response) => {
  try {

    const newUser = req.query.newUser;

    if (newUser === "true") {
      if (!req.body.phonenumber || !req.body.code || !req.body.currency || !req.body.name) {
        return res.status(400).json({
          message: "Please provide all the details"
        });
      }
    } else {
      if (!req.body.phonenumber || !req.body.code) {
        return res.status(400).json({
          message: "Please provide all the details"
        });
      }
    }

    const verification = await client.verify.v2.services(otpServiceId)
      .verificationChecks
      .create({ to: req.body.phonenumber, code: req.body.code })

    if (verification?.status === "approved") {

      // check if user already exists
      let user = await User.findOne({ whatsappNumber: req.body.phonenumber });
      if (user) {

        if (newUser === "true") {
          return res.status(424).json({
            error: "User already exists",
            message: "User already exists",
          });
        }

        const payload = {
          id: user._id,
          name: user.name,
          whatsappNumber: user.whatsappNumber,
          currency: user.currency
        };

        const token = generateToken(payload);

        return res.status(200).json({
          message: "OTP verified successfully",
          token: token,
          user: {
            id: user._id,
            name: user.name,
            phonenumber: user.whatsappNumber,
            currency: user.currency
          }
        });
      }

      user = await User.create({
        whatsappNumber: req.body.phonenumber,
        currency: req.body.currency,
        name: req.body.name,
      });

      const payload = {
        id: user._id,
        name: user.name,
        whatsappNumber: user.whatsappNumber,
        currency: user.currency
      };

      const token = generateToken(payload);

      return res.status(200).json({
        message: "OTP verified successfully",
        token: token,
        user: {
          id: user._id,
          name: user.name,
          phonenumber: user.whatsappNumber,
          currency: user.currency
        }
      });
    } else {
      return res.status(400).json({
        message: "OTP verification failed"
      });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).send({
      error: "Something went wrong",
      message: "Something went wrong. Please try again.",
    });
  }
});

module.exports = authRouter;
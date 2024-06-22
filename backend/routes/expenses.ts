import { Request, Response } from "express";
import IExpense from "../interfaces/expense";
const express = require("express");
const { User, Expense } = require("../schemas");
const { getUser } = require("../jwt")
const expensesRouter = express.Router();


expensesRouter.get("/user/:userId", async (req: Request, res: Response) => {

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
        message: "User not found"
      });
    }

    const expenses = await Expense.find({ user: userId }).sort({ date: -1 })
    if (!expenses) {
      return res.status(404).send({
        error: "Expenses not found",
        message: "Expenses not found"
      });
    }

    return res.json(expenses);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

expensesRouter.get("/:expenseId", async (req: Request, res: Response) => {

  try {

    const expenseId = req.params.expenseId;

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).send({
        error: "Expense not found",
        message: "Expense not found"
      });
    }

    return res.json(expense);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

// create expense
expensesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const expense: IExpense = req.body;

    console.log("Expense: ", expense);

    const token = req.headers['authorization']?.split(" ")[1]
    const authUser = getUser(token);

    if (expense.user != authUser?.id && authUser?.role !== "admin") {
      return res.status(403).send({
        error: "You are not authorized",
        message: "You are not authorized"
      });
    }
    // validate user
    const user = await User.findById(expense.user);

    if (!user) {
      return res.status(400).send({
        error: "User not found",
        message: "User not found",
      });
    }

    const newExpense = await Expense.create(expense);
    return res.status(201).json(newExpense);
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      error: "Something went wrong",
      message: "Something went wrong",
    });
  }
});

// update expense
expensesRouter.put("/:expenseId", async (req: Request, res: Response) => {
  try {
    const expenseId = req.params.expenseId;
    const expense: IExpense = req.body;


    const token = req.headers['authorization']?.split(" ")[1]
    const authUser = getUser(token);

    if (expense.user != authUser?.id && authUser?.role !== "admin") {
      return res.status(403).send({
        error: "You are not authorized",
        message: "You are not authorized"
      });
    }
    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, expense, {
      new: true,
    });
    if (!updatedExpense) {
      return res.status(404).send({
        error: "Expense not found",
        message: "Expense not found",
      });
    }
    return res.status(201).json(updatedExpense);

  } catch (err) {
    console.error(err);
    return res.status(500).send({
      error: "Something went wrong",
      message: "Something went wrong",
    });
  }
});

// delete
expensesRouter.delete("/:expenseId", async (req: Request, res: Response) => {
  try {
    const expenseId = req.params.expenseId;
    const expense = await Expense.findById(expenseId);
    const token = req.headers['authorization']?.split(" ")[1]
    const authUser = getUser(token);

    if (expense.user != authUser?.id && authUser?.role !== "admin") {
      return res.status(403).send({
        error: "You are not authorized",
        message: "You are not authorized"
      });
    }
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      return res.status(404).send({
        error: "Expense not found",
        message: "Expense not found",
      });
    }
    return res.status(201).json(deletedExpense);
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      error: "Something went wrong",
      message: "Something went wrong",
    });
  }
});

module.exports = expensesRouter;
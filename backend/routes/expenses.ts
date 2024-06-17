import { Request, Response } from "express";
import IExpense from "../interfaces/expense";
const express = require("express");
const expensesRouter = express.Router();

const { User, Expense } = require("../schemas");

expensesRouter.get("/:userId", async (req: Request, res: Response) => {

  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const expenses = await Expense.find({ user: userId })
    if (!expenses) {
      return res.status(404).send("Expenses not found");
    }

    return res.json(expenses);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

// create expense
expensesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const expense: IExpense = req.body;

    // validate user
    const user = await User.findById(expense.user);

    if (!user) {
      return res.status(400).send("User not found");
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


    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, expense, {
      new: true,
    });
    if (!updatedExpense) {
      return res.status(404).send("Expense not found");
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
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      return res.status(404).send("Expense not found");
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
import { Request, Response } from "express";
import IExpense from "../interfaces/expense";
const express = require("express");
const mongoose = require("mongoose");
const { User, Expense } = require("../schemas");
const { getUser } = require("../jwt")
const analyticsRouter = express.Router();


analyticsRouter.get("/dashboard/:userId", async (req: Request, res: Response) => {

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

    // const expenses = await Expense.find({ user: userId }).sort({ date: -1 })
    // if (!expenses) {
    //   return res.status(404).send({
    //     error: "Expenses not found",
    //     message: "Expenses not found"
    //   });
    // }

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);

    // previous month
    const startOfPreviousMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
    const endOfPreviousMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0, 23, 59, 59, 999);

    console.log(startOfMonth, endOfMonth)
    console.log(startOfPreviousMonth, endOfPreviousMonth)

    let dashboardData: any = {}
    // get sum of expenses for this month
    const thisMonthExpenses = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), date: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    if (thisMonthExpenses && thisMonthExpenses.length > 0) {
      dashboardData.totalThisMonth = thisMonthExpenses[0].total
    } else {
      dashboardData.totalThisMonth = 0
    }
    const previousMonthExpenses = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), date: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);


    if (previousMonthExpenses && previousMonthExpenses.length > 0) {
      dashboardData.totalPreviousMonth = previousMonthExpenses[0].total
    } else {
      dashboardData.totalPreviousMonth = 0
    }

    // console.log(thisMonthExpenses)
    // console.log(previousMonthExpenses)

    let totalChange = 100
    if (dashboardData.totalPreviousMonth > 0) {
      totalChange = (dashboardData.totalThisMonth - dashboardData.totalPreviousMonth) / dashboardData.totalPreviousMonth * 100
    }

    dashboardData.totalChange = Number(totalChange.toFixed(2))

    // Find Top Category

    const topCategory = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), date: { $gte: startOfMonth, $lte: endOfMonth } } },
      {
        $group: {
          _id: '$category', // Group by category
          totalAmount: { $sum: '$amount' } // Calculate the sum of amount for each category
        }
      },
      {
        $sort: { totalAmount: -1 } // Sort by totalAmount in descending order
      },
      {
        $limit: 1 // Limit to get the top category
      }
    ]);

    console.log(topCategory)

    if (topCategory && topCategory.length > 0 && topCategory[0]._id) {
      dashboardData.topCategory = topCategory[0]._id
      dashboardData.topCategoryAmount = topCategory[0].totalAmount
    } else {
      dashboardData.topCategory = "Not Avalilable"
      dashboardData.topCategoryAmount = "Not Avalilable"
    }

    // const topCategoryPreviousMonth = await Expense.aggregate([
    //   { $match: { user: new mongoose.Types.ObjectId(userId), date: { $gte: startOfMonth, $lte: endOfMonth } } },
    //   {
    //     $group: {
    //       _id: '$category', // Group by category
    //       totalAmount: { $sum: '$amount' } // Calculate the sum of amount for each category
    //     }
    //   },
    //   {
    //     $sort: { totalAmount: -1 } // Sort by totalAmount in descending order
    //   },
    //   {
    //     $limit: 1 // Limit to get the top category
    //   }
    // ]);

    console.log(topCategory)

    if (topCategory && topCategory.length > 0 && topCategory[0]._id) {
      dashboardData.topCategory = topCategory[0]._id
    } else {
      dashboardData.topCategory = "Not Avalilable"
    }

    const totalDaysThisMonth = (endOfMonth.getTime() - startOfMonth.getTime()) / (1000 * 60 * 60 * 24) + 1;

    console.log(totalDaysThisMonth)

    const totalDaysPreviousMonth = (endOfPreviousMonth.getTime() - startOfPreviousMonth.getTime()) / (1000 * 60 * 60 * 24) + 1;

    const averageExpenseThisMonth = dashboardData.totalThisMonth / totalDaysThisMonth;
    const averageExpensePreviousMonth = dashboardData.totalPreviousMonth / totalDaysPreviousMonth;

    dashboardData.averageExpenseThisMonth = averageExpenseThisMonth
    dashboardData.averageExpensePreviousMonth = averageExpensePreviousMonth
    if (averageExpensePreviousMonth > 0) {
      dashboardData.averageExpenseChange = Number((averageExpenseThisMonth - averageExpensePreviousMonth) / averageExpensePreviousMonth * 100).toFixed(2)
    } else {
      dashboardData.averageExpenseChange = 100
    }

    return res.json(dashboardData);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

module.exports = analyticsRouter;
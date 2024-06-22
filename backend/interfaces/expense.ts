import { ObjectId } from "mongoose";

export default interface IExpense {
  user: ObjectId
  description: string,
  amount: number,
  category: string,
  subCategory: string,
  date: Date,
}
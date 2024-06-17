import { ObjectId } from "mongoose";

export default interface IExpense {
  user: ObjectId
  description: string,
  value: number,
  category: string,
  subCategory: string,
  date: Date,
}
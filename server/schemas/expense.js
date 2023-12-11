import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: Number,
  year: Number,
  month: Number,
  entryId: mongoose.Schema.Types.ObjectId
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
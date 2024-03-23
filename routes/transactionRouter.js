const express = require("express");
const {
  newTransaction,
  deleteTransaction,
  getTransactions,
  summaryByMonth,
  allSummaryReports,
  categoryReports,
  itemsCategoryReports,
  resetTransactions,
  clearByOperation,
  allInfoTransaction,
  allReportsTransactions,
} = require("../controllers/transactions");

const { tryCatchWrapper } = require("../utils/tryCatchWrapper");
const { auth } = require("../config/passport-jwt");

// const { validateTransaction } = require("../middlewares/joiValidation");
// const {
//   transactionSchema,
//   operationSchema,
//   summaryReportsSchema,
//   categoryReportsSchema,
//   itemsCategorySchema,
//   infoTransactionSchema,
// } = require("../schemas/joi/joiTransaction");

const userTransaction = express.Router();

// dodanie nowej transakcji  - stare 

userTransaction.post(
  "/new",
  auth,
  // validateTransaction(transactionSchema),
  tryCatchWrapper(newTransaction)
);

// pobranie wszystkich transakcji - trzeba podać typ operacji (income lub expenses) -stare
userTransaction.get("/operation", auth, tryCatchWrapper(getTransactions));




// ---------------  pobranie i dodanie transakcji expenses - nowe 

userTransaction.post("/transaction/expenses", auth, tryCatchWrapper(newTransaction));
userTransaction.get("/transaction/expenses", auth, tryCatchWrapper(getTransactions));




// ---------------------
userTransaction.post("/transaction/income", auth, tryCatchWrapper(newTransaction));
userTransaction.get("/transaction/income", auth, tryCatchWrapper(getTransactions));

userTransaction.delete("/transaction/:id", auth, tryCatchWrapper(deleteTransaction));






// zwraca sum - po typie operacji osobno income i expenses z rozbiciem na miesiące

userTransaction.post(
  "/summary",
  auth,
  // validateTransaction(operationSchema),
  tryCatchWrapper(summaryByMonth)
);

// zwraca operacje i suma po wpisaniu year i month
userTransaction.post(
  "/all-summary-reports",
  auth,
  // validateTransaction(summaryReportsSchema),
  tryCatchWrapper(allSummaryReports)
);

// raport z podana katogaria i suma - podajesz month year i operation
userTransaction.post(
  "/category-reports",
  auth,
  // validateTransaction(categoryReportsSchema),
  tryCatchWrapper(categoryReports)
);

// podobny jak wyzej - tylko podajac kategorie rozbija na description ( do bardziej szczegółowego charta)
userTransaction.post(
  "/items-category-reports",
  auth,
  // validateTransaction(itemsCategorySchema),
  tryCatchWrapper(itemsCategoryReports)
);

// raporty
userTransaction.post(
  "/all-operation",
  auth,
  // validateTransaction(infoTransactionSchema),
  tryCatchWrapper(allInfoTransaction)
);

userTransaction.post(
  "/all-reports",
  auth,
  // validateTransaction(infoTransactionSchema),
  tryCatchWrapper(allReportsTransactions)
);

// usuwanie

userTransaction.delete("/delete-all", auth, tryCatchWrapper(resetTransactions));

userTransaction.put(
  "/delete-all-operation",
  auth,
  // validateTransaction(operationSchema),
  tryCatchWrapper(clearByOperation)
);

module.exports = userTransaction;

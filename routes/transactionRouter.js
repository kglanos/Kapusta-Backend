const express = require("express");

const {
  allInfoTransaction,
  allReportsTransactions,
  allSummaryReports,
  categoryReports,
  clearByOperation,
  deleteTransaction,
  getExpenseTransactions,
  getTransactions,
  itemsCategoryReports,
  newTransaction,
  resetTransactions,
  summaryByMonth,
} = require("../controllers/transactions");
const { tryCatchWrapper } = require("../utils/tryCatchWrapper");
const { auth } = require("../config/passport-jwt");

const router = express.Router();

router.post(
  "/new",
  auth,
  // validateTransaction(transactionSchema),
  tryCatchWrapper(newTransaction)
);
// pobranie wszystkich transakcji - trzeba podać typ operacji (income lub expenses) -stare
router.get("/operation", auth, tryCatchWrapper(getTransactions));

// ---------------  pobranie i dodanie transakcji expenses - nowe

router.post("/transaction/expenses", auth, tryCatchWrapper(newTransaction));
router.get("/transaction/expenses", auth, tryCatchWrapper(getTransactions));

// ---------------------
router.post("/transaction/income", auth, tryCatchWrapper(newTransaction));
router.get("/transaction/income", auth, tryCatchWrapper(getTransactions));

router.delete("/transaction/:id", auth, tryCatchWrapper(deleteTransaction));

router.get("/transaction/total-espenses", async (req, res) => {
  try {
    // Pobierz wszystkie transakcje wydatków
    const expenseTransactions = await getExpenseTransactions();
    // Zsumuj kwoty wszystkich transakcji wydatków
    const totalExpense = expenseTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    // Zwróć sumę jako odpowiedź
    res.json({ totalExpense });
  } catch (error) {
    console.error("Błąd podczas pobierania sumy wydatków:", error);
    res
      .status(500)
      .json({ error: "Wystąpił błąd podczas przetwarzania żądania" });
  }
});

// zwraca sum - po typie operacji osobno income i expenses z rozbiciem na miesiące

router.post(
  "/summary",
  auth,
  // validateTransaction(operationSchema),
  tryCatchWrapper(summaryByMonth)
);

// zwraca operacje i suma po wpisaniu year i month
router.post(
  "/all-summary-reports",
  auth,
  // validateTransaction(summaryReportsSchema),
  tryCatchWrapper(allSummaryReports)
);

// raport z podana katogaria i suma - podajesz month year i operation
router.post(
  "/category-reports",
  auth,
  // validateTransaction(categoryReportsSchema),
  tryCatchWrapper(categoryReports)
);

// podobny jak wyzej - tylko podajac kategorie rozbija na description ( do bardziej szczegółowego charta)
router.post(
  "/items-category-reports",
  auth,
  // validateTransaction(itemsCategorySchema),
  tryCatchWrapper(itemsCategoryReports)
);

// raporty
router.post(
  "/all-operation",
  auth,
  // validateTransaction(infoTransactionSchema),
  tryCatchWrapper(allInfoTransaction)
);

router.post(
  "/all-reports",
  auth,
  // validateTransaction(infoTransactionSchema),
  tryCatchWrapper(allReportsTransactions)
);

// usuwanie

router.delete("/delete-all", auth, tryCatchWrapper(resetTransactions));

router.put(
  "/delete-all-operation",
  auth,
  // validateTransaction(operationSchema),
  tryCatchWrapper(clearByOperation)
);

module.exports = router;

const {
  createTransaction,
  getTransactionsByOperation,
  deleteTransactionById,
  getSummaryByMonth,
  getAllSummaryReports,
  getCategoryReports,
  getItemsCategoryReports,
  resetTransactionsAndBalance,
  clearTransactionsByOperation,
  getInfoAllTransaction,
  getAllReportsTransactions,
} = require("../services/servicesTransactions/transactions");

const {
  updateUserBalance,
  updateUserBalanceAfterDelete,
  updateUserBalanceAfterAllDelete,
  updateUserBalanceAfterAllDeleteByOperation,
} = require("../services/servicesTransactions/updateBalance");

// Dodawanie nowej transakcji
const newTransaction = async (req, res, _) => {
  console.log(req, res)
  try {
    const transaction = await createTransaction(req.body, req.user._id);
    const { userId, operation: operationType, sum: operationSum } = transaction;
    const updatedUserBalance = await updateUserBalance(
      userId,
      operationType,
      operationSum
    );
    return res
    .status(201)
    .json({ data: transaction, user: { balance: updatedUserBalance } });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

// Pobranie transakcji według typu operacji
const getTransactions = async (req, res, _) => {
  try {
    const { id } = req.user;
    // const { operation } = req.body;
    const transactions = await getTransactionsByOperation(id);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

// Usuwanie transakcji po ID
const deleteTransaction = async (req, res, _) => {
  try {
    const { id } = req.params;
    const transaction = await deleteTransactionById(id);
    const { userId, operation: operationType, sum: operationSum } = transaction;
    const updatedBalance = await updateUserBalanceAfterDelete(
      userId,
      operationType,
      operationSum
    );
    res
      .status(200)
      .json({ data: transaction, user: { balance: updatedBalance } });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

// Pobranie sumy transakcji według przychodów lub wydatków dla danego miesiąca
const summaryByMonth = async (req, res, _) => {
  try {
    const { operation } = req.body;
    const { id } = req.user;
    const transactionSummary = await getSummaryByMonth(id, operation);
    res.status(200).json(transactionSummary);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

// Pobranie wszystkich raportów podsumowujących dla danego miesiąca i roku
const allSummaryReports = async (req, res, _) => {
  try {
    const { month, year } = req.body;
    const { id } = req.user;
    const summaryReports = await getAllSummaryReports(id, month, year);
    res.status(200).json(summaryReports);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

// Pobranie raportów kategorii dla określonego miesiąca, roku i typu operacji
const categoryReports = async (req, res, _) => {
  try {
    const { month, year, operation } = req.body;
    const { id } = req.user;
    const categoryReports = await getCategoryReports(
      id,
      month,
      year,
      operation
    );
    res.status(200).json(categoryReports);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

// Pobranie szczegółowych raportów kategorii dla określonego miesiąca, roku, typu operacji i kategorii
const itemsCategoryReports = async (req, res, _) => {
  try {
    const { month, year, operation, category } = req.body;
    const { id } = req.user;
    const itemizedCategoryReports = await getItemsCategoryReports(
      id,
      month,
      year,
      operation,
      category
    );
    res.status(200).json(itemizedCategoryReports);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};


// Resetowanie transakcji i salda
const resetTransactions = async (req, res, _) => {
  try {
    const { id } = req.user;
    const deletionInfo = await resetTransactionsAndBalance(id);
    const userUpdated = await updateUserBalanceAfterAllDelete(id);
    res.status(200).json({
      transactions: [],
      info: deletionInfo,
      balance: userUpdated.balance,
      firstBalance: userUpdated.firstBalance,
    });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

// Czyszczenie transakcji według typu operacji
const clearByOperation = async (req, res, _) => {
  try {
    const { operation } = req.body;
    const { id } = req.user;
    const userUpdated = await updateUserBalanceAfterAllDeleteByOperation(
      id,
      operation
    );
    const deletionInfo = await clearTransactionsByOperation(id, operation);
    res.status(200).json({
      transactions: [],
      info: deletionInfo,
      balance: userUpdated.balance,
    });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

// Pobranie informacji o transakcji na podstawie typu operacji, miesiąca, roku i kategorii
const allInfoTransaction = async (req, res, _) => {
  try {
    const { operation, month, year, category } = req.body;
    const { id } = req.user;
    const transactionInfo = await getInfoAllTransaction(
      id,
      operation,
      month,
      year,
      category
    );
    res.status(200).json(transactionInfo);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

// Pobranie wszystkich raportów dla użytkownika dla danego miesiąca i roku
const allReportsTransactions = async (req, res, _) => {
  try {
    const { month, year } = req.body;
    const { id } = req.user;
    const reports = await getAllReportsTransactions(id, month, year);
    res.status(200).json(reports);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

module.exports = {
  newTransaction,
  deleteTransaction,
  summaryByMonth,
  allSummaryReports,
  categoryReports,
  itemsCategoryReports,
  getTransactions,
  resetTransactions,
  clearByOperation,
  allInfoTransaction,
  allReportsTransactions,
};

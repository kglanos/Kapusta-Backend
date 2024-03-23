const { ObjectId } = require("mongodb");

const Transaction = require("../../schemas/transaction");

// Dodawanie nowej transakcji
const createTransaction = async (data, id, operationType) => {
  try {
    data.userId = id;
    data.operationType = operationType;
    const transaction = await Transaction.create(data, operationType);
    return transaction;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Pobieranie wszystkich transakcji według typu operacji
const getTransactionsByOperation = async (id, operationType) => {
  try {
    const transactions = await Transaction.find({ userId: id, operationType});

    return transactions;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Usuwanie transakcji po ID
const deleteTransactionById = async (id) => {
  console.log(id)
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id });

    if (!transaction) {
      throw new Error(`Transaction with id does not exist`);
    }
    return transaction;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// Pobieranie podsumowania transakcji dla danego miesiąca
const getSummaryByMonth = async (id, operation) => {
  const today = new Date();
  const year = today.getFullYear();

  try {
    const transactions = await Transaction.find({
      userId: id,
      year,
      operation,
    });
    const monthNumbers = [];
    const result = transactions.reduce((acc, item) => {
      if (Object.keys(acc).includes(item.month)) {
        acc[item.month] = +acc[item.month] + +item.sum;
        return acc;
      }

      acc[item.month] = +item.sum;
      monthNumbers.push(item.date.slice(5, 7));

      return acc;
    }, {});

    const newRes = [...Object.entries(result)];
    const arrNew = newRes.map((itm, idx) => {
      const trans = {
        month: itm[0],
        sum: itm[1],
        monthNumber: +monthNumbers[idx],
      };
      return trans;
    });
    return arrNew;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Pobieranie wszystkich raportów podsumowujących dla danego miesiąca i roku
const getAllSummaryReports = async (id, month, year) => {
  try {
    const transactions = await Transaction.find({
      userId: id,
      year,
      month,
    });

    const result = transactions.reduce(
      (acc, itm) => {
        acc[itm.operation] = +acc[itm.operation] + +itm.sum;
        return acc;
      },
      { income: 0, expenses: 0 }
    );

    const newRes = [...Object.entries(result)];
    const arrNew = newRes.map((itm, idx) => {
      const trans = {
        operation: itm[0],
        sum: itm[1],
      };
      return trans;
    });
    return arrNew;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Pobieranie raportów kategorii dla określonego miesiąca, roku i typu operacji
const getCategoryReports = async (id, month, year, operation) => {
  try {
    const transactions = await Transaction.find({
      userId: id,
      year,
      month,
      operation,
    });

    const result = transactions.reduce((acc, itm) => {
      if (Object.keys(acc).includes(itm.category)) {
        acc[itm.category] = +acc[itm.category] + +itm.sum;
        return acc;
      }
      acc[itm.category] = itm.sum;
      return acc;
    }, {});

    const newRes = [...Object.entries(result)];
    const arrNew = newRes.map((itm, idx) => {
      const trans = {
        category: itm[0],
        sum: itm[1],
      };
      return trans;
    });
    return arrNew;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Pobieranie szczegółowych raportów kategorii dla określonego miesiąca, roku, typu operacji i kategorii
const getItemsCategoryReports = async (
  id,
  month,
  year,
  operation,
  category
) => {
  try {
    const transactions = await Transaction.find({
      userId: id,
      year,
      month,
      operation,
      category,
    });

    const result = transactions.reduce((acc, itm) => {
      if (Object.keys(acc).includes(itm.description)) {
        acc[itm.description] = +acc[itm.description] + +itm.sum;
        return acc;
      }
      acc[itm.description] = itm.sum;
      return acc;
    }, {});

    const newRes = [...Object.entries(result)];
    const arrNew = newRes.map((itm, idx) => {
      const trans = {
        description: itm[0],
        sum: itm[1],
      };
      return trans;
    });
    return arrNew;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// Resetowanie transakcji i salda
const resetTransactionsAndBalance = async (id) => {
  try {
    const response = await Transaction.deleteMany({
      userId: id,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Czyszczenie transakcji według typu operacji
const clearTransactionsByOperation = async (id, operation) => {
  try {
    const response = await Transaction.deleteMany({
      userId: id,
      operation,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Pobranie informacji o transakcji na podstawie typu operacji, miesiąca, roku i kategorii
const getInfoAllTransaction = async (id, operation, month, year, category) => {
  try {
    const data1 = await getItemsCategoryReports(
      id,
      month,
      year,
      operation,
      category
    );
    const data2 = await getAllSummaryReports(id, month, year);
    const data3 = await getCategoryReports(id, month, year, operation);

    return [
      {
        itemsCategoryReports: data1,
        allSummaryReports: data2,
        categoryReports: data3,
      },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Pobranie wszystkich raportów dla użytkownika dla danego miesiąca i roku
const getAllReportsTransactions = async (id, month, year) => {
  try {
    const reports = [
      {
        $facet: {
          allSummaryReports: [
            {
              $match: {
                userId: new ObjectId(id),
                month,
                year,
              },
            },
            {
              $group: {
                _id: "$operation",
                sum: { $sum: "$sum" },
              },
            },
            {
              $project: {
                _id: 0,
                operation: "$_id",
                sum: 1,
              },
            },
          ],
          categoryReports: [
            {
              $match: {
                userId: new ObjectId(id),
                month,
                year,
              },
            },
            {
              $group: {
                _id: "$operation",
                transactions: {
                  $push: {
                    category: "$category",
                    sum: { $sum: "$sum" },
                  },
                },
              },
            },
            { $unwind: "$transactions" },
            {
              $group: {
                _id: {
                  operation: "$_id",
                  category: "$transactions.category",
                },
                sum: { $sum: "$transactions.sum" },
                simple: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: "$_id.operation",
                category: {
                  $push: {
                    category: "$_id.category",
                    sum: "$sum",
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                operation: "$_id",
                category: 1,
              },
            },
          ],
          itemsCategoryReports: [
            {
              $match: {
                userId: new ObjectId(id),
                month,
                year,
              },
            },
            {
              $group: {
                _id: "$operation",
                transactions: {
                  $push: {
                    category: "$category",
                    description: "$description",
                    sum: { $sum: "$sum" },
                  },
                },
              },
            },
            { $unwind: "$transactions" },
            {
              $group: {
                _id: {
                  operation: "$_id",
                  category: "$transactions.category",
                  description: "$transactions.description",
                },
                sum: { $sum: "$transactions.sum" },
              },
            },
            {
              $group: {
                _id: "$_id.operation",
                description: {
                  $push: {
                    category: "$_id.category",
                    description: "$_id.description",
                    sum: "$sum",
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                operation: "$_id",
                description: 1,
              },
            },
          ],
        },
      },
    ];

    const result = await Transaction.aggregate(reports);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createTransaction,
  getSummaryByMonth,
  getAllSummaryReports,
  getCategoryReports,
  getItemsCategoryReports,
  getTransactionsByOperation,
  deleteTransactionById,
  resetTransactionsAndBalance,
  clearTransactionsByOperation,
  getInfoAllTransaction,
  getAllReportsTransactions,
};

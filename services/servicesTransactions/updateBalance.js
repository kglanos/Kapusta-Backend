const User = require("../../schemas/user");

const Transaction = require("../../schemas/transaction");



// Funkcja aktualizująca saldo użytkownika
const updateUserBalance = async (userId, operationType, operationAmount) => {
  try {
    // Pobieranie użytkownika na podstawie jego identyfikatora
    const user = await User.findById(userId);
    let userBalance = user.balance;

    // Aktualizacja salda użytkownika w zależności od rodzaju operacji
    switch (operationType) {
      case "income":
        userBalance += operationAmount;
        break;
      case "expenses":
        userBalance -= operationAmount;
        break;
      default:
        break;
    }

    // Aktualizacja salda użytkownika w bazie danych
    const { balance: updatedUserBalance } = await User.findByIdAndUpdate(
      userId,
      { balance: userBalance },
      { new: true }
    );

    return updatedUserBalance;
  } catch (error) {
    // Obsługa błędów
    throw new Error("Coś poszło nie tak podczas obliczania salda użytkownika");
  }
};

// Funkcja aktualizująca saldo użytkownika po usunięciu transakcji
const updateUserBalanceAfterDelete = async (
  userId,
  operationType,
  operationAmount
) => {
  try {
    // Pobieranie użytkownika na podstawie jego identyfikatora
    const user = await User.findById(userId);
    let userBalance = user.balance;

    // Aktualizacja salda użytkownika w zależności od rodzaju operacji
    switch (operationType) {
      case "income":
        userBalance -= operationAmount;
        break;
      case "expenses":
        userBalance += operationAmount;
        break;
      default:
        break;
    }

    // Aktualizacja salda użytkownika w bazie danych
    const { balance: updatedUserBalance } = await User.findByIdAndUpdate(
      userId,
      { balance: userBalance },
      { new: true }
    );

    return updatedUserBalance;
  } catch (error) {
    // Obsługa błędów
    throw new Error("Coś poszło nie tak podczas obliczania salda użytkownika");
  }
};

// Funkcja aktualizująca saldo użytkownika po usunięciu wszystkich transakcji
const updateUserBalanceAfterAllDelete = async (userId) => {
  try {
    // Aktualizacja salda użytkownika na wartość 0 i ustawienie flagi firstBalance na false
    const user = await User.findByIdAndUpdate(
      userId,
      { balance: 0, firstBalance: false },
      { new: true }
    );
    return user;
  } catch (error) {
    // Obsługa błędów
    throw new Error(
      "Nie udało się zaktualizować salda użytkownika po usunięciu wszystkich transakcji"
    );
  }
};

// Funkcja aktualizująca saldo użytkownika po usunięciu wszystkich transakcji według określonej operacji
const updateUserBalanceAfterAllDeleteByOperation = async (
  userId,
  operation
) => {
  try {
    // Pobieranie wszystkich transakcji użytkownika według określonej operacji
    const transactionsByOperation = await Transaction.find({
      userId,
      operation,
    });
    // Obliczenie sumy transakcji
    const sumByOperation = transactionsByOperation.reduce((acc, item) => {
      acc += item.sum;
      return acc;
    }, 0);
    // Pobranie aktualnego salda użytkownika
    const { balance } = await User.findById(userId);

    // Obliczenie nowego salda użytkownika na podstawie operacji
    const newBalance =
      operation === "expenses"
        ? balance + sumByOperation
        : balance - sumByOperation;
    // Aktualizacja salda użytkownika w bazie danych
    const user = await User.findByIdAndUpdate(
      userId,
      { balance: newBalance },
      { new: true }
    );
    return user;
  } catch (error) {
    // Obsługa błędów
    throw new Error(
      "Nie udało się zaktualizować salda użytkownika po usunięciu wszystkich transakcji według określonej operacji"
    );
  }
};

// Eksportowanie funkcji
module.exports = {
  updateUserBalance,
  updateUserBalanceAfterDelete,
  updateUserBalanceAfterAllDelete,
  updateUserBalanceAfterAllDeleteByOperation,
};

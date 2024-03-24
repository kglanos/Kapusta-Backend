const User = require("../schemas/user"); 

const updateInitialBalance = async (req, res) => {
  const { balance } = req.body;
  console.log(req.body)
  const userId = req.user._id; // Identyfikator aktualnie zalogowanego użytkownika

  if (!balance) {
    return res.status(400).json({ error: 'Brak wymaganych danych: balance jest wymagane' });
  }

  try {
    // Znajdź aktualnie zalogowanego użytkownika
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
    }

    // Zaktualizuj saldo użytkownika
    user.balance = balance;
    await user.save();

    return res.status(200).json({ message: 'Saldo użytkownika zostało pomyślnie zaktualizowane', user });
  } catch (error) {
    console.error('Błąd podczas aktualizacji salda użytkownika:', error.message);
    return res.status(500).json({ error: 'Coś poszło nie tak podczas aktualizacji salda użytkownika' });
  }
};

module.exports = {updateInitialBalance} ;

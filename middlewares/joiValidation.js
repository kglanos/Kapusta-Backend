const validateTransaction = (schema) => { // myślę że validacje łatwiej robić w routes albo controller ale nie jako middleware ale po prostu w kodzie.
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }
    return next();
  };
};

module.exports = {
  validateTransaction,
};

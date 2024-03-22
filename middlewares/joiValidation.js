const validateTransaction = (schema) => {
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

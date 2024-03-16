const Joi = require("joi");

const validateTransaction = (schema) => {
  return (req, _, next) => {
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      throw error;
    }
    return next();
  };
};

module.exports = {
  validateTransaction,
};

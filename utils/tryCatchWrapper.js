const tryCatchWrapper = (endpointFn) => {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

module.exports = {
  tryCatchWrapper,
};

const tryCatchWrapper = (endpointFn) => {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
      // throw 'errr'; //wystarczy to odkomentować i zobaczyć jak ta aplikacja przestaje działać.
    } catch (error) {
      console.log(error);
      throw error; // To będzie wam blokować aplikację. Bo po throw to musi zostać obsłużone wyżej przez inny blok catch
    }
  };
};

module.exports = {
  tryCatchWrapper,
};

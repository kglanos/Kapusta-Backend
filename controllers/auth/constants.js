export const httpCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

export const Role = {
  ADMIN: "administrator",
  USER: "user",
};

export const Messages = {
  BAD_REQUEST: {
    en: "Bad request. Invalid ObjectId",
  },
  UNAUTHORIZED: {
    en: "Invalid credential",
  },
  CONFLICT: {
    en: "Such email is registered already",
  },
  NOT_FOUND: {
    en: "Not found",
  },
  NOT_FOUND_TRANS: {
    en: "Not found transaction",
  },
  NOT_AUTHORIZED: {
    en: "Not authorized",
  },
  FORBIDDEN: {
    en: "Access is denied",
  },
  TOO_MANY_REQUESTS: {
    en: "Too many requests, please try again later.",
  },
  MISSING_FIELDS: {
    en: "Missing fields",
  },
  TOO_LITTLE_BALANCE: {
    en: "Insufficient balance",
  },

  AMOUNT_VS_BALANCE: {
    en: "Conflict. The transaction cannot be deleted. The transaction amount exceeds your balance.",
  },

  SUM_VALUE_POSITIVE: {
    en: "Conflict. Sum value must be positive.",
  },

  REBALANCING_TRUE: {
    en: "Conflict. You have already used the recharge option.",
  },
};

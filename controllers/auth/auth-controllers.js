import { httpCodes, Messages } from "./constants";
import { CustomError } from "./custom-errors";

import userService from "../../services/user-service";
import authService from "../../services/auth-service";

class AuthControllers {
  async registration(req, res, next) {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);
    if (isUserExist) {
      throw new CustomError(
        httpCodes.CONFLICT,
        Messages.CONFLICT[req.app.get("lang")]
      );
    }
    const data = await userService.create(req.body);
    res
      .status(httpCodes.OK)
      .json({ status: "success", code: httpCodes.OK, data });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await authService.getUser(email, password);

    if (!user) {
      throw new CustomError(
        httpCodes.UNAUTHORIZED,
        Messages.UNAUTHORIZED[req.app.get("lang")]
      );
    }
    const { name, id, balance, rebalancing } = user;
    const token = authService.getToken(user);
    await authService.setToken(user.id, token);
    res.status(httpCodes.OK).json({
      status: "succes",
      code: httpCodes.OK,
      data: { name, id, balance, rebalancing, token },
    });
  }

  async logout(req, res, next) {
    await authService.setToken(req.user.id, null);
    res
      .status(httpCodes.NO_CONTENT)
      .json({ status: "success", code: httpCodes.NO_CONTENT, data: {} });
  }
}

const authControllersInstance = new AuthControllers();

export { AuthControllers, authControllersInstance };

// async logout(req, res, next) {
//     await authService.setToken(req.user.id, null)
//     res
//       .status(httpCodes.NO_CONTENT)
//       .json({ status: "success", code: httpCodes.NO_CONTENT, data: {} })
// }

// class AuthService {
//   async isUserExist(email) {
//     const user = await userService.findByEmail(email)
//     return !!user
//     }
//       async getUser(email, password) {
//     const user = await userService.findByEmail(email)
//     const isValidPass = await user?.isValidPassword(password)
//     if (!isValidPass) {
//       return null
//     }
//     return user
//   }

//   getToken(user) {
//     const id = user.id
//     const payload = { id }
//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" })
//     return token
//   }

//   async setToken(id, token) {
//     await this.updateToken(id, token)
//   }

//   async updateToken(id, token) {
//     return await User.updateOne({ _id: id }, { token })
//   }
// }

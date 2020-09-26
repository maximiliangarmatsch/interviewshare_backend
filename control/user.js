
const ApiError = require('../error/ApiError');

class UserControl {
  user(req, res, next) {
    const { msg } = req.body;
    if (!msg) {
      next(ApiError.badRequest('message should not be blank'));
      return;
    }
    res.sendStatus(201);
  }
}



 module.exports = new UserControl();

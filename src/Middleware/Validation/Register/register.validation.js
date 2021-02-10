const {
  regUsers
} = require('./register.schema')
module.exports = {
  addRegReqValidation: async (req, res, next) => {
    const value = await regUsers.validate(req.body)
    if (value.error) {
      res.json({
        success: 0,
        code: 403,
        message: value.error.details[0].message
      })
    } else {
      next()
    }
  }
}

module.exports = function (app) {
  app.get('/logout', function (req, res, next) {
    res.status(200).json({ success: 'Logged Out Successfully' })
  })
}

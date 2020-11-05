const { read: ReadCSV } = require('../../Components/csv/main')

module.exports = function (app) {
  app.get('/csv/read', ReadCSV)
}

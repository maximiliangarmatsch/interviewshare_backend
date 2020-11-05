const { create: GeneratePDF } = require('../../Components/pdf/main')

module.exports = function (app) {
  app.get('/pdf/create', GeneratePDF)
}

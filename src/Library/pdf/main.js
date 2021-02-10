const { pdf: CreatePDF } = require('./functions/create')

exports.create = function (req, res, next) {
  CreatePDF(res)
}

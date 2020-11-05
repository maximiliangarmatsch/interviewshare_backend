const { csv: ReadCSV } = require('./functions/reader')

exports.read = function (req, res, next) {
  ReadCSV(req.filename)
}

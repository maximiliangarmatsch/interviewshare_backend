const { csv } = require('../utils/csv/reader');

exports.read = function (req, res, next) {
    csv(req.filename);
};

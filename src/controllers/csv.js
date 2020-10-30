const {csv} =require('../utils/csv/reader')
exports.reader = function(req ,res ,next){
    csv(req.filename);
    
   
}
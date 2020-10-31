const {pdf} =require('../utils/pdf/create')
exports.create = function(req ,res ,next){
    pdf(res);
    
   
}

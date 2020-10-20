const {pdf} =require('../utils/pdf/create')
exports.pdf = function(req ,res ,next){
    pdf(res);
    
   
}
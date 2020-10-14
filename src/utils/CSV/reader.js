const fs = require("fs");
const csv = require("csvtojson");
const { Parser } = require("json2csv");
module.exports = {
    read : async function a(fname,callback)  {
        const fileName = fname
        const job = await csv().fromFile(fileName);
        return callback(job);
    }
    // a("job.csv",(data)=>{console.log(data)})
}
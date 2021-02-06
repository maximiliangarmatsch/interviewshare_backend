const csv = require('csvtojson')

module.exports = {
  read: async function a (fname, callback) {
    const fileName = fname
    const job = await csv().fromFile(fileName)
    return callback(job)
  }
  // a("job.csv",(data)=>{console.log(data)})
}

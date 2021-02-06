const { google } = require('googleapis')
const keys = require('./key.json')
const Excel = require('exceljs')

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  'https://www.googleapis.com/auth/spreadsheets'
])
client.authorize(function (error, tokens) {
  if (error) {
    console.groupCollapsed(error)
  } else {
    console.log('Successfully connected')
    gsrun(client)
  }
})

async function gsrun (cl) {
  const gsapi = google.sheets({ version: 'v4', auth: cl })

  const wb = new Excel.Workbook()
  const excelFile = await wb.xlsx.readFile('data.xlsx')
  const ws = excelFile.getWorksheet('Total')
  let data = ws.getSheetValues()

  data = data.map(function (r) {
    return [r[1], r[2], r[3], r[4], r[5], r[6]]
  })
  data.shift()
  data.shift()
  console.log(data)
}

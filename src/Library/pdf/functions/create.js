const Pdfdocument = require('pdfkit')
const Pdftable = require('voilab-pdf-table')

module.exports = {
  pdf (res) {
    const pdf = new Pdfdocument({
      autoFirstPage: false
    })
    const table = new Pdftable(pdf, {
      bottomMargin: 30
    })

    table
      .addPlugin(
        new (require('voilab-pdf-table/plugins/fitcolumn'))({
          column: 'name'
        })
      )
      .setColumnsDefaults({
        headerBorder: 'B',
        align: 'right'
      })
      .addColumns([
        {
          id: 'name',
          header: 'Name',
          align: 'left'
        },
        {
          id: 'email',
          header: 'Email',
          width: 100
        },
        {
          id: 'job',
          header: 'Job',
          width: 60
        },
        {
          id: 'country',
          header: 'Country',
          width: 80,
          renderer (tb, data) {
            return data.country
          }
        }
      ])
      .onPageAdded((tb) => {
        tb.addHeader()
      })
    pdf.addPage()
    table.addBody([
      {
        name: 'Nasir',
        email: 'nasir@gmail.com',
        job: 'backend',
        country: 'Indoneia'
      },
      {
        name: 'Umer',
        email: 'umer@gmail.com',
        job: 'backend',
        country: 'Pakistan'
      },
      {
        name: 'Nikola',
        email: 'nikola@gmail.com',
        job: 'HR',
        country: 'Germany'
      },
      {
        name: 'Max', email: 'max@gmail.com', job: 'backend', country: 'Germany'
      }
    ])

    pdf.end()
    pdf.pipe(res)
  }

}


const pdfdocument = require('pdfkit');
var pdftable = require('voilab-pdf-table');

module.exports = {
     pdf : function(res){
        const pdf = new pdfdocument({
            autoFirstPage: false,
          }),
          table = new pdftable(pdf, {
            bottomMargin: 30,
          });
        
        table
          .addPlugin(
            new (require('voilab-pdf-table/plugins/fitcolumn'))({
              column: 'name',
            })
          )
          .setColumnsDefaults({
            headerBorder: 'B',
            align: 'right',
          })
          .addColumns([
            {
              id: 'name',
              header: 'Name',
              align: 'left',
            },
            {
              id: 'email',
              header: 'Email',
              width: 100,
            },
            {
              id: 'job',
              header: 'Job',
              width: 60,
            },
            {
              id: 'country',
              header: 'Country',
              width: 80,
              renderer: function (tb, data) {
                return data.country;
              },
            },
          ])
          .onPageAdded(function (tb) {
            tb.addHeader();
          });
        pdf.addPage();
        table.addBody([
          {
            name: 'Nasir',
            email: 'nasir@gmail.com',
            job: 'backend',
            country: 'Indoneia',
          },
          {
            name: 'Umer',
            email: 'umer@gmail.com',
            job: 'backend',
            country: 'Pakistan',
          },
          {
            name: 'Nikola',
            email: 'nikola@gmail.com',
            job: 'HR',
            country: 'Germany',
          },
          { name: 'Max', email: 'max@gmail.com', job: 'backend', country: 'Germany' },
        ]);
        
        pdf.end();
        pdf.pipe(res)
     }


};

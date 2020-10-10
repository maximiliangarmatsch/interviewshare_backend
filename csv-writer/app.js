const express = require('express')
const pdfdocument = require('pdfkit');
var pdftable = require('voilab-pdf-table');
const fs = require('fs');

const app = express()

const pdf = new pdfdocument({
	autoFirstPage: false
}),

table = new pdftable(pdf, {
	bottomMargin: 30
})

 table
      .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
        column: 'description'
       }))

     .setColumnsDefaults({
          headerBorder: 'B',
          align: 'right'
            })

     .addColumns([
                {
                    id: 'description',
                    header: 'Product',
                    align: 'left'
                },
                {
                    id: 'quantity',
                    header: 'Quantity',
                    width: 50
                },
                {
                    id: 'price',
                    header: 'Price',
                    width: 40
                },
                {
                    id: 'total',
                    header: 'Total',
                    width: 70,
                    renderer: function (tb, data) {
                        return data.total;
                    }
                }
            ])
            .onPageAdded(function (tb) {
                tb.addHeader();
            });
        pdf.addPage();
        table.addBody([
            {description: 'Product 1', quantity: 1, price: 20.10, total: 20.10},
            {description: 'Product 2', quantity: 4, price: 4.00, total: 16.00},
            {description: 'Product 3', quantity: 2, price: 17.85, total: 35.70},
            {description: 'Product 4', quantity: 2, price: 17.85, total: 35.70},
            {description: 'Product 5', quantity: 5, price: 17.85, total: 35.70},
            {description: 'Product 6', quantity: 6, price: 17.85, total: 35.70}
        ]);
 
       pdf.end()
       pdf.pipe(fs.createWriteStream('output.pdf'))

       app.listen(3000, (request, response) => {
       	console.log('Server is up on port 3000')
       })

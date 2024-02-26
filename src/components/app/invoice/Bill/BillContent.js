function generateHTML(bill) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Invoice</title>
    
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> 
    
        <style>
            html{
                width: 210mm;
                min-height: 317mm;
                background-color: white;
            }
            #footer {
                position: relative;
                bottom: 0;
                margin-bottom: 0;
            }
            .in-body {
                height: 860px
            }
            @page {
              size: A4;
              margin: 0;
            }
            @media print {
                html, body {
                    width: 210mm;
                    height: 297mm;
                }
            }        
        </style>        
    </head>
    <body>
        <div class="border border-dark" id="content-size">
            <img src="https://i.ibb.co/BGT2D7r/Header.png" width="100%" height="auto" alt="Header">               
            
            <div class="container" id="client">
                <div class="row">
                    <div class="col-9 ml-5">
                        <h2 class="mt-3 font-weight-bold" style="color:#000080">Invoice</h2>
                        <p class="font-weight-bold">Invoice # ${
                          bill.invoiceNo
                        } , ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} </p>
                    </div>
                    <div class="col-1 mt-5">
                    </div>
                </div>            
            </div>
            
            <div class="in-body mr-5 ml-5">
                <table class="table mt-3">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item / Service</th>
                        <th scope="col" class="text-center">Qty</th>
                        <th scope="col" class="text-center">Unit Price (Rs.)</th>
                        <th scope="col" class="text-center">Unit Discount (Rs.)</th>
                        <th scope="col" class="text-center" style="width: "40%";">Total (Rs.)</th>
                      </tr>
                    </thead>
                    <tbody>
                    ${
                      bill.itemList && bill.serviceList
                        ? `<tr class="font-weight-bold">Services</tr>`
                        : `<div style={}></div>`
                    }
                      ${
                        bill.serviceList && bill.serviceList.length > 0
                          ? bill.serviceList.map((i, index) => {
                              return `
                          <tr>
                            <th scope="row">${index + 1}</th>
                            <td>${i.serviceType}</td>
                            <td class="text-center">${i.qnt}</td>
                            <td class="text-right">${parseFloat(
                              i.total
                            ).toFixed(2)}</td>
                            <td class="text-right">${
                              i.serviceDiscount
                                ? parseFloat(i.serviceDiscount).toFixed(2)
                                : "-"
                            }</td>
                            <td class="text-right">${parseFloat(
                              i.total
                            ).toFixed(2)}</td>
                          </tr>  
                        `;
                            })
                          : ""
                      }  
                    ${
                      bill.itemList && bill.serviceList
                        ? `<tr class="font-weight-bold">Items</tr>`
                        : ""
                    }
                      ${
                        bill.itemList && bill.itemList.length > 0
                          ? bill.itemList.map((i, index) => {
                              return `
                          <tr>
                            <th scope="row">${index + 1}</th>
                            <td>${i.itemNameSelect}</td>
                            <td class="text-center">${i.qnt}</td>
                            <td class="text-right">${parseFloat(
                              i.unitPrice
                            ).toFixed(2)}</td>
                            <td class="text-right">${
                              i.unitDiscount
                                ? parseFloat(i.unitDiscount).toFixed(2)
                                : "-"
                            }</td>
                            <td class="text-right">${parseFloat(
                              i.total
                            ).toFixed(2)}</td>
                          </tr>  
                        `;
                            })
                          : ""
                      }                                                              
                    </tbody>
                  </table>
                  <hr> 
                  <div class="row mt-5">
                    <div class="col-6  ml-5">
                      <h5 class="mt-3 mb-5 font-weight-bold">Invoice To</h5>
                        <h6 class="mb-4 font-weight-bold">${
                          bill?.customer ? bill.customer.name : ""
                        }</h6>
                        <div class="row">
                          <div class="col-4 ">
                            <p>Mobile   </p>
                            <p>Email   </p>
                            <p>Vehicle   </p>
                            <p>Mileage </p>
                          </div>
                          <div class="col-8 font-weight-bold">
                            <p>${
                              bill?.customer?.mobile
                                ? bill.customer.mobile
                                : "-"
                            }</p>
                            <p>${
                              bill?.customer?.email ? bill.customer?.email : "-"
                            }</p>
                            <p>${
                              bill.customer?.vehicleRegNo
                                ? bill.customer.vehicleRegNo
                                : "-"
                            }</p>
                            <p>${
                              bill.customer
                                ? bill.customer.mileage + " KM"
                                : "-"
                            }</p>
                          </div>
                        </div>                            
                    </div>
                    <div class="col-3 text-start ">
                      <p>Subtotal    </p>
                      <p>Discount  </p>
                      <h5 class="font-weight-bold">Grand Total  </h5>
                    </div>
                    <div class="col-2 text-right font-weight-bold">
                      <p> ${parseFloat(bill.totalAmount).toFixed(2)}</p>
                      <p> ${
                        bill.discount
                          ? parseFloat(bill.discount).toFixed(2)
                          : 0.0
                      }</p>
                      <h5 class="font-weight-bold"> ${parseFloat(
                        bill.finalAmount
                      ).toFixed(2)}</h5>
                    </div>
                  </div>
            </div>
            <div id="footer">
              <img src="https://i.ibb.co/W6dtR6s/Footer.png" width="100%" height="auto" alt="Footer">
            </div>                
        </div>            
    </body>
  </html>
    `;
}

export default generateHTML;

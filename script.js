let items = [];

function addItem() {
  const table = document.getElementById("itemTable");

  const row = table.insertRow(-1); // always add at bottom

  row.innerHTML = `
    <td><input type="text" placeholder="Item"></td>
    <td><input type="number" placeholder="Qty"></td>
    <td><input type="number" placeholder="Rate"></td>
  `;
}
function numberToWords(num) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convertHundreds(n) {
    let str = "";

    if (n > 99) {
      str += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }

    if (n > 19) {
      str += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    } else if (n >= 10) {
      str += teens[n - 10] + " ";
      return str;
    }

    if (n > 0) {
      str += ones[n] + " ";
    }

    return str;
  }

  if (num === 0) return "Zero";

  let result = "";

  if (num >= 10000000) {
    result += convertHundreds(Math.floor(num / 10000000)) + "Crore ";
    num %= 10000000;
  }

  if (num >= 100000) {
    result += convertHundreds(Math.floor(num / 100000)) + "Lakh ";
    num %= 100000;
  }

  if (num >= 1000) {
    result += convertHundreds(Math.floor(num / 1000)) + "Thousand ";
    num %= 1000;
  }

  if (num > 0) {
    result += convertHundreds(num);
  }

  return result.trim();
}

function generateInvoice() {
  const name = document.getElementById("clientName").value;
  const address = document.getElementById("clientAddress").value;
  const number = document.getElementById("invoiceNumber").value;
  const date = document.getElementById("invoiceDate").value;

  const table = document.getElementById("itemTable");

  let rows = table.rows;
  let tableHTML = "";
  let grandTotal = 0;

  for (let i = 1; i < rows.length; i++) {
    let desc = rows[i].cells[0].children[0].value;
    let qty = rows[i].cells[1].children[0].value;
    let rate = rows[i].cells[2].children[0].value;

    let amount = qty * rate;
    grandTotal += amount;

    tableHTML += `
      <tr>
        <td>${i}</td>
        <td>${desc}</td>
        <td>${qty}</td>
        <td>${rate}</td>
        <td>${amount}</td>
      </tr>
    `;
  }

  document.getElementById("invoice").innerHTML = `


<div class="logo-container">
  <img src="logo.png" class="logo">
</div>

<div class="top-row">
    
    <div class="center">
      <div class="invoice-title" style="text-align:center;">INVOICE</div>
    </div>
  </div>

  <div class="info-row">
    <div>Invoice No: ${number}</div>
    <div>Date: ${date}</div>
  </div>

  <div class="to">
    To:<br>
    ${name}<br>
    ${address}
  </div>

  <table>
    <tr>
      <th>Sr. No.</th>
      <th>Description</th>
      <th>Qty</th>
      <th>Amt. (INR)</th>
      <th>Total (INR)</th>
    </tr>
    ${tableHTML}
    <tr class="total-row">
      <td colspan="4">Total</td>
      <td>${grandTotal}</td>
    </tr>
  </table>

  <div class="amount-words">
    Amount In Words : ${numberToWords(grandTotal)} Rupees Only.
  </div>

  <div class="section">
    <div class="section-title">Terms & Conditions.</div>
    All taxes are included above.<br>
    25% advance payment is required before starting the work.<br>
    Balance payment is required within 15 days of invoice date.<br>
    Payment can be made via NEFT/IMPS/UPI to the bank details mentioned below.<br>
  </div>

  <div class="section">
    <div class="section-title">Bank Details.</div>
    Bank Name: HDFC Bank.<br>
    Beneficiary Name: LANGOOR MEDIA LLP.<br>
    A/c No: 50200096850029.<br>
    IFSC: HDFC0002454.
  </div>

  <div class="signature">
    Sd/-<br>
    Angad Kulkarni<br>
    Co-founder & Partner<br>
    Langoor Media LLP
  </div>

  <div class="footer">
    LLPINACG - 9398<br>
    101 Vasundhara, Nyati Garden, Mohammadwadi, Hadapsar, Pune. 411060<br>
    9145303690 | 9420496112
  </div>


`;
}
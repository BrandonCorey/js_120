// What are two disadvantages of working with factory functions?

// They take up a lot of memory because all of the methods and state are reproduced
// You cannot tell if a certain object came from a factory function or not

function makeObj() {
  return {
    propA: 10,
    propB: 20
  }
}

function createInvoice(services = {}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 6500,
    payment: [],

    total() {
      return this.phone + this.internet;
    },
    addPayments(...payment) {
      this.payments = payment;
    }
  }
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000

function createPayment(services = {}) {
  return {
    internet: services.internet || 0,
    phone: services.phone || 0,
    amount: services.amount || 0,

    total() {
      return (this.internet + this.phone) || this.amount;
    }
  }
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000
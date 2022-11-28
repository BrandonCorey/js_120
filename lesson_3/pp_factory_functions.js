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
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(payment) {
      this.payments.push(...payment);
    },

    paymentTotal() {
      return payments.reduce((sum, payment)  => sum + payment.total(), 0);
    },

    amountDue() {
      return this.total() - paymentTotal(this.payments);
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

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

console.log(invoice.addPayment(payment1));
console.log(invoice.addPayments([payment2, payment3]));
console.log(invoice.amountDue());       // this should return 0
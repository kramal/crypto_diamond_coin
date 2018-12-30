const uuid = require("uuid/v1");

class Transaction {
  constructor({ senderWallet, recipient, amount }) {
    this.id = uuid();
  }
}

module.exports = Transaction;

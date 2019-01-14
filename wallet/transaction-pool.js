const Transaction = require('./transaction');
class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }

  setMap(TransactionPoolMap) {
    this.transactionMap = transactionMap;
  }

  existingTransaction({ inputAddress }) {
    const transactions = Object.values(this.transactionMap);

    return transactions.find(
      transaction => transaction.input.address === inputAddress
    );
  }

  validTransaction() {
    return Object.values(this.transactionMap).filter(transaction =>
      Transaction.validTransaction(transaction)
    );
  }
}

module.exports = TransactionPool;

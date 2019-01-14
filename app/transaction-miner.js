class TransactionMiner {
  constructor({ blockchain, transactionPool, wallet, pubsub }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    rhis.wallet = wallet;
    this.pubsub = pubsub;
  }

  mineTransactions() {
    // get the transaction pool`s valid transactions
    // generate the miner s reward
    // add a block consisting of these transactions to the blockchain
    // braodcast the updated blockchain
    // clear the pool
  }
}

module.exports = TransactionMiner;

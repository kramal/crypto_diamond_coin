const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION'
};

class PubSub {
  constructor({ blockchain, transactionPool, wallet }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;

    this.publisher = redis.createClient();
    this.subsciber = redis.createClient();

    this.subscribeToChannels();

    this.subsciber.on('message', (channel, message) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}`);

    const parsedMessage = JSON.parse(message);

    switch (channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(parsedMessage);
        break;
      case CHANNELS.TRANSACTION:
        if (
          !this.transactionPool.existingTransaction({
            inputAddress: this.wallet.publicKey
          })
        ) {
          this.transactionPool.setTransaction(parsedMessage);
        }
        break;
      default:
        return;
    }
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach(channel => {
      this.subsciber.subscribe(channel);
    });
  }

  publish({ channel, message }) {
    this.subsciber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subsciber.subscribe(channel);
      });
    });

    this.publisher.publish(channel, message);
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction)
    });
  }
}

module.exports = PubSub;

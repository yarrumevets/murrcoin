const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
  toString() {
    return `Block -
    Timestamp: ${this.timestamp}
    Last Hash: ${this.lastHash.substring(0, 10)}
    Hash     : ${this.hash.substring(0, 10)}
    Data     : ${this.data}`;
  }

  static genesis() {
    return new this("Beginning of time!", "-----", "f1r57-h45h", []);
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = "todo-hash"; // @TODO create a hash function
    return new this(timestamp, lastHash, hash, data);
  }

  static hash(timestamp, lastHash, data) {}
}
module.exports = Block;
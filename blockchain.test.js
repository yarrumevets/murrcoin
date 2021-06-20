const Blockchain = require("./blockchain");
const Block = require("./block");
const { expect, it } = require("@jest/globals");

describe("Blockchain", () => {
  let bc, bc2;
  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it("starts with the genesis block", () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block", () => {
    const data = "foo";
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  // check good chain
  it("validates a valid chain", () => {
    bc2.addBlock("foo");
    console.log("sdlfkjsdk+ ", bc.isValidChain(bc2.chain));
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  // check back genesis block
  it("invalidates a chain with a currupt genesis block", () => {
    bc2.chain[0].data = "some bad data";
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  // check bad block
  it("invalidates a chain with a currupt block", () => {
    bc2.addBlock("foo");
    bc2.chain[1].data = "tampered data";
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("Replaces the chain with a valid chain.", () => {
    bc2.addBlock("goo");
    bc.replaceChain(bc2.chain); // copied by reference.
    expect(bc.chain).toEqual(bc2.chain);
  });

  it("Does not eplace the chain with on of less than or equal length.", () => {
    bc.addBlock("bar");
    bc.replaceChain(bc2.chain); // bc now has more blocks than bc2
    expect(bc.chain).not.toEqual(bc2.chain);
  });
});

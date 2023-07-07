//** Hash Txid */
//0xe8a42f5b6d6225e89ed6150c3d5165551f7b42248e00c1e4f8c4e096be157cd0

//** Raw Tx */
//keccak256(raw tx) = hash tx
//0xf86c01850c4b201000825208949cbfd6ebdb9cfcccd6b043f43e524583486d455e880490283b23ec8f768025a067da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6ca00b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842

//Finding V/R/S 
//0x
//f8 
//6c
//01 = nonce

//0x85 - 0x80 = 133 - 128 = 5 bytes

//85 0c4b201000 (selected 5 bytes, gasPrice)

//0x82 - 0x80 = 2 bytes

//82 5208 (selected 2 bytes, gasLimit)

//0x94 - 0x80 = 148 - 128 = 20 bytes

//94 9cbfd6ebdb9cfcccd6b043f43e524583486d455e (selected 20 bytes, to address)

//0x88 - 0x80 = 8 bytes
//88 0490283b23ec8f76 (selected 8 bytes, to value)

//80 - data (empty)

//0x25, 1 byte is encoded itself
//25  - v variable

//a0 - 0x80 = 160 - 128 = 32 bytes
//selected 32 bytes, r variable
//a0 67da959a6d114d42016b5fb43f8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c 

//a0 - 0x80 = 160 - 128 = 32 bytes
//selected 32 bytes, s variable
//a0 0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842

//v: 25 (hex)
//a0 (next 32 bytes) r: 67da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c
//a0 (next 32 bytes) s: 0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842

//1 nibble = 4 bits
//1 byte = 8 bits

const ethutil = require("ethereumjs-util");
const EthereumTx = require("ethereumjs-tx").Transaction;

const txParams = {
  nonce: "0x01", //1
  gasPrice: "0x0C4B201000", //52800000000 wei
  gasLimit: "0x5208", //21,000 wei for normal transaction
  to: "0x9cbfD6EbDb9cfcccd6b043f43e524583486d455e",
  value: "0x0490283B23EC8F76", //328807007268933494 we,
  data: "0x", //null, ""
  v: "0x25",
  r: "0x67da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c",
  s: "0x0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842",
};

const tx = new EthereumTx(txParams, { chain: "mainnet" });

const key = tx.getSenderPublicKey();
//keccak256(public key) = 
//d854623eb394bee7c483b540055b936d7603f0b12b980631884b0628bb10a86e
//sender address the last 20 bits = 0x055b936d7603f0b12b980631884b0628bb10a86e

const address = tx.getSenderAddress();
const isValid = tx.verifySignature();

console.log("Public Key: ", key.toString("hex")); //75f8f18b4b406cfbe953b5efc2e0902cf8ac2787f91e8e9853aa1d5eeb5b8f7244247e7901b5c2389230eb185320aa44d3f87c884501b108531a50034b05541e
console.log("Address: ", address.toString("hex")); //0x055b936d7603f0b12b980631884b0628bb10a86e
console.log("Is Valid: ", isValid); //true

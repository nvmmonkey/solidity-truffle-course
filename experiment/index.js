//** Hash Txid */
//0xe8a42f5b6d6225e89ed6150c3d5165551f7b42248e00c1e4f8c4e096be157cd0

//** Raw Tx */
//keccak256(raw tx) = hash tx
//0xf8 6c 01850c4b201000825208949cbfd6ebdb9cfcccd6b043f43e524583486d455e880490283b23ec8f768025a067da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6ca00b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842

//Finding V/R/S
//0x

//If the total payload of a list is more than 55 bytes long, the RLP encoding consists of a single byte with value 0xf7
//01101100  (https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/)

//f8 = f7 + length of payload in binary format of bytes
//6c = 108 decimal = 108 bytes is payload
//01 (hex) = nonce = 1 (decimal)

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

//** ------------ */
//** 2nd Example */
//** ------------ */

//0xf9
//028b

//15850ab5d04c0083041791941a2a1c938ce3ec39b6d47113c7955baa9dd454f280b90224993e1c420000000000000000000000000000000000000000000000000000000000073fd600000000000000000000000011c0dfa506db0e0d4672a739be91beb229d18ee3000000000000000000000000cc8fa225d80b9c7d42f96e9570156c65d6caaa250000000000000000000000000000000000000000000000000000000000000d1a00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000014a01602f64798e85f3871d0e02deda8759ee41375f3d68b23fe0c89a367d47a700410a3f2fa897a8804bb064812a41492135f5a8047b101964dd6f76c954dc0250e31c014dc1ac05e490d16aba5570fe299ac99bf472df74a58fed054490b1c2c2b54b943b8ec6388cf3f82d4bdee9f8c836b621741670bc5feed6691dd37a30bc9e8e9e1b015aad0f40f7cbcea63fd0cd29871cbf2a7f0270b29178f3eda67c03e49449b61d5adb33078c9b214e5101dc1a8957f163ef9ce4aad3197c91ae9d7cf85d9ba2561c01b205543e0b55611a49c388836e631b586f547968b8b3d7f609c72d583b93ce8a4d24df7e5f8c47b954461d281c2354308bdefa75e3e6843dfacc635dd3836b051b01acdbb612a111de738c71077f137306662b9327f2c8b739ea9b447fdb25ec3a271dd7078fca2a8b29f8ab57299336e424946352eb43aec1c58dfdde5c5bb32ae81c0000000000000000000000000000000000000000000026a094a311406440139d3aae964eceabc2ca738a27f693866541e8ec993aeb34a343a05be5bbd6aa5970dfd3e80ed58a45e435172eb7df59b3e3659a1bee6bcee837c5
//f9 - f7 = 2bytes
//028b = payload = 651 bytes

//15 (hex) = nonce = 21 (decimal)

const txParams2 = {
  nonce: "0x01", //1
  gasPrice: "0x0C4B201000", //52800000000 wei
  gasLimit: "0x5208", //21,000 wei for normal transaction
  to: "0x9cbfD6EbDb9cfcccd6b043f43e524583486d455e",
  value: "0x0490283B23EC8F76", //328807007268933494 we,
  data: "0x", //null, ""
};

const tx2 = new EthereumTx(txParams2, { chain: "mainnet" });
const privateKey = Buffer.from(
  "a36c31913c0423994e2da43cab2e7cf60255f0634b92236bc76ad8e7053fd874",
  "hex"
);

tx2.sign(privateKey);

const key2 = tx2.getSenderPublicKey();
const address2 = tx2.getSenderAddress();
const isValid2 = tx2.verifySignature();

console.log('')
console.log("Public Key: ", key2.toString("hex"));
console.log("Address: ", address2.toString("hex"));
console.log("Is Valid: ", isValid2);

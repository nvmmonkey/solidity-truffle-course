const Trie = require("merkle-patricia-tree").SecureTrie; // We import the library required to create a basic Merkle Patricia Tree
const { keccak256 } = require("ethereumjs-util");
const { BranchNode } = require("merkle-patricia-tree/dist/trieNode");

var trie = new Trie(); // We create an empty Patricia Merkle Tree

const traverseTrie = (node) => {
  trie.walkTrie(node, (_, node) => {
    if (node) {
      console.log(node);
      console.log(node.hash().toString("hex"));
      if (node instanceof BranchNode) {
        for (let i = 0; i < 16; i++) {
          const buffer = node.getBranch(i);
          if (buffer && buffer.length > 0) {
            traverseTrie(buffer);
          }
        }
      }
    }
  });
};

async function test() {
  await trie.put(
    Buffer.from("32fa7b"), //branch node at different Leaf Node
    // keccak256(key1:32fa7b) =
    // nibles (decimals) to (Heximals) = hash
    // hash 3(branch node) +  nibbles(hex) -> 3865e1f181df18d1fff8847c6298e5b2c621a56f368e030e8ead670c8b01aa1
    Buffer.from("10")
    // Nibbles decimals(keccak256(key) -> hash ) | Value (buffer: ASCII text to HEX)
    // ASCII Text to Hex 31 30
  );

  await trie.put(
    Buffer.from("32fa7c"), //branch node at different Leaf Node
    // keccak256(key2:32fa7c) =
    // nibles (decimals) to (Heximals) = hash
    // hash 4(branch node) + nibbles(hex) -> f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2
    Buffer.from("20")
    // Nibbles | Value (buffer: ASCII text to HEX)
    // ASCII Text to Hex 32 30
  );

  traverseTrie(trie.root);

  console.log("Root Hash: ", trie.root.toString("hex"));

  const path = await trie.findPath(keccak256(Buffer.from("32fa7b")));

  console.log("NODE: ", path.node.serialize().toString("hex")); //RLP encoded version of the leaf node
  console.log("NODE: ", keccak256(path.node.serialize())); //hash buffer of the keccak256(RLP encoded)
  console.log("NODE: ", path.node.value.toString("ascii")); //value in the leaf node to ASCII
}

test();

//** ___________ */
//** SINGLE NODE */
//** ___________ */

// keccak256(key) as a String
// 4f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2

// add 20 hex prefix if nibbles are even
// 20 4f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2

// 0x80 (128 bytes) + 33 bytes(66 characters/length in bytes) = 161 bytes = a1
// 0x80 + 2(length of value) = 0x82 (value in hex)
//  a1 204f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2 82 3230

//0xC0(hex) = 192 (dec) + 37 bytes (length of the payload 74 bits) = 229 (dec) = e5(hex)
// e5 a1204f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230

// keccak(RLP) =
// e5a1204f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230
// roothash = 17dee68b36b0276d8db503b497c8335d5d4ace0ed3fef5f6fa62644dcd66f170

//** ___________ */
//** MORE NODE */
//** ___________ */

// keccak256(32fa7c) as a String
// 4 is stored in the Branch Node
// hash = branch node(4) + leaf node(f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2)

// RPL - 20 if number is even, 3 if number is odd
// f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2
// 63 bits is a odd number, so add 3
// => 3f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2

// a0(hex prefix) = 0x80(hex) + 32(bytes) = 128(dec) + 32 = 160 (dec)
// => a03f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2

// 0x80 + 2(length of value) = 0x82 (value in hex, value is 20 => 32 30(hex))
// => a03f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230

// add first bytes to indicate length of sequence
// e4 = 0xc0 + 32 payload in bytes(length of payload is 72 bits)
// => e4 a03f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230

// keccak256(RLP hex) = hash
// hash of the leaf node => b7f631fbd6cfb1aeb19411e75fc33769934c7ea2242a47b54ed6895e9627a0fc

// keccak256(32fa7b) as a String
// 3 is stored in the Branch Node
// hash = branch node(3) + leaf node(3865e1f181df18d1fff8847c6298e5b2c621a56f368e030e8ead670c8b01aa1)

// RPL - 20 if number is even, 3 if number is odd
// 33865e1f181df18d1fff8847c6298e5b2c621a56f368e030e8ead670c8b01aa1

// a0(hex prefix) = 0x80(hex) + 32(bytes) = 128(dec) + 32 = 160 (dec)
// => a033865e1f181df18d1fff8847c6298e5b2c621a56f368e030e8ead670c8b01aa1

// 0x80 + 2(length of value) = 0x82 (value in hex, value is 10 => 31 30(hex))
// => a033865e1f181df18d1fff8847c6298e5b2c621a56f368e030e8ead670c8b01aa1823130

// add first bytes to indicate length of sequence
// e4 = 0xc0 + 32 payload in bytes(length of payload is 72 bits)
// => e4 a033865e1f181df18d1fff8847c6298e5b2c621a56f368e030e8ead670c8b01aa1823130

// keccak256(RLP hex) = hash
// hash of the leaf node => 2fd2c9e2e74e9d07a920dd1ebf94f1bd7a5aa1764464769c83ce1cbb38137d65

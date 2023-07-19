const Trie = require("merkle-patricia-tree").SecureTrie; // We import the library required to create a basic Merkle Patricia Tree
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
// 0x80 + 2 = 0x82
//  a1 204f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2 82 3230

//0xC0(hex) = 192 (dec) + 37 bytes (length of the payload 74 bits) = 229 (dec) = e5(hex)
// e5 a1204f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230

// keccak(RLP) =
// e5a1204f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230
// roothash = 17dee68b36b0276d8db503b497c8335d5d4ace0ed3fef5f6fa62644dcd66f170

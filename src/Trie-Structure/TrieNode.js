// TrieNode.js
class TrieNode {
    constructor(data) {
        this.data = data;
        this.children = new Array(26).fill(null);
        this.isTerminal = false;
    }
}

export default TrieNode;

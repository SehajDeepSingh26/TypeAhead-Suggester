// Trie.js
import TrieNode from "./TrieNode";

class Trie {
    constructor() {
        this.root = new TrieNode('\0');
        this.count = 0;
    }

    insertWord(root, word) {
        if (word.length === 0) {
            if (!root.isTerminal) {
                root.isTerminal = true;
                return true;
            }
            return false;
        }

        const index = word.charCodeAt(0) - 'a'.charCodeAt(0);
        let child = root.children[index] || new TrieNode(word[0]);
        root.children[index] = child;

        return this.insertWord(child, word.substr(1));
    }

    insertWordToTrie(word) {
        if (this.insertWord(this.root, word)) {
            this.count++;
        }
    }

    complete(root, word, output, results) {
        if (word.length === 0) {
            if (root.isTerminal) 
                results.push(output);
            root.children.forEach((child) => {
                if (child)
                    this.complete(child, "", output + child.data, results);
            });
            return;
        }

        const index = word.charCodeAt(0) - 'a'.charCodeAt(0);
        if (root.children[index]) {
            this.complete(root.children[index], word.substr(1), output + word[0], results);
        }
    }

    autoComplete(key) {
        const results = [];
        var start = new Date().getTime();
        
        this.complete(this.root, key, "", results);

        var end = new Date().getTime();
        var time = end - start;
        console.log('Search time: ' + time);
        return results;
    }
}

export default Trie;

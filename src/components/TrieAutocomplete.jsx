/* eslint-disable react/prop-types */

import { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";
import Trie from "../Trie-Structure/Trie";
import AiResponse from "./AiResponse";
// import GeminiApiRes from "./GeminiApi";

const TrieAutocomplete = ({ searchKey }) => {

    const [res, setRes] = useState(false)

    const [suggestions, setSuggestions] = useState([]);
    const { text, setText, wordList, setWordList, trie, setTrie } = useContext(StateContext);

    const changeInput = (suggestion) => {
        setText(suggestion)
    };

    useEffect(() => setRes(false), [text])

    const addWord = () => {
        if (text) {
            setWordList(prevList => [...prevList, text]); // Append the new word to the existing list
            const newTrie = trie;
            newTrie.insertWordToTrie(text);
            setTrie(newTrie)
        }
    }

    useEffect(() => {
        const newTrie = new Trie();
        wordList.forEach(word => {
            newTrie.insertWordToTrie(word)
        });
        setTrie(newTrie)
    }, [])

    useEffect(() => {        
        setSuggestions(searchKey ? trie?.autoComplete(searchKey) : []);
    }, [searchKey, wordList]);

    return (
        <div className="mt-4 w-full max-w-md mx-auto">
            <h4 className="text-lg font-semibold mb-2">Autocomplete Suggestions</h4>
            {suggestions?.length > 0 ? (
                <ul className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg shadow-md p-2">
                    {
                        suggestions.map((suggestion, index) => (
                            <li
                                onClick={() => changeInput(suggestion)}
                                key={index}
                                className="p-2 hover:bg-blue-100 cursor-pointer text-gray-700"
                            >
                                {suggestion}
                            </li>
                        ))
                    }
                </ul>
            ) : (
                <div className="flex gap-20">
                    <p className="text-gray-500 mt-3">No suggestions available</p>
                    <button className="px-6  border border-black rounded-lg shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                        onClick={() => addWord()}>
                        Add Word to Dictionary
                    </button>
                </div>
            )}

            {
                text && (
                    <div className="p-3">
                        <button 
                          className="px-6 mt-5 p-1 border border-black rounded-lg shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out" 
                          onClick={() => setRes(true)}>
                            Search
                        </button>
                        {res && <AiResponse />}
                    </div>
                )
            }
        </div>
    );
};

export default TrieAutocomplete;

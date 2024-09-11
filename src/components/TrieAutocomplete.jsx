/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";
import Trie from "../Trie-Structure/Trie";
import AiResponse from "./AiResponse";

const TrieAutocomplete = ({ searchKey }) => {
    const [res, setRes] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const { text, setText, wordList, setWordList, trie, setTrie } = useContext(StateContext);

    const changeInput = (suggestion) => {
        setText(suggestion);
    };

    useEffect(() => setRes(false), [text]);

    const addWord = () => {
        if (text) {
            setWordList((prevList) => [...prevList, text]); // Append the new word to the existing list
            const newTrie = trie;
            newTrie.insertWordToTrie(text);
            setTrie(newTrie);
        }
    };

    useEffect(() => {
        const newTrie = new Trie();
        wordList.forEach((word) => {
            newTrie.insertWordToTrie(word);
        });
        setTrie(newTrie);
    }, []);

    useEffect(() => {
        setSuggestions(searchKey ? trie?.autoComplete(searchKey) : []);
    }, [searchKey, wordList]);

    return (
        <div className="mt-4 w-full max-w-md sm:max-w-xs md:max-w-md mx-auto p-4 sm:p-2">
            <h4 className="text-lg sm:text-base font-semibold mb-2 text-center">Autocomplete Suggestions</h4>
            {suggestions?.length > 0 ? (
                <ul className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg shadow-md p-2">
                    {suggestions.map((suggestion, index) => (
                        <li
                            onClick={() => changeInput(suggestion)}
                            key={index}
                            className="p-2 hover:bg-blue-100 cursor-pointer text-gray-700"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col sm:flex-row sm:gap-10 items-center justify-between mt-3">
                    <p className="text-gray-500 text-sm text-center">No suggestions available</p>
                    <button
                        className="px-4 py-2 text-sm border border-black rounded-lg shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                        onClick={() => addWord()}
                    >
                        Add Word to Dictionary
                    </button>
                </div>
            )}

            {text && (
                <div className="p-3 flex flex-col items-center">
                    <button
                        className="px-4 py-2 mt-5 text-sm border border-black rounded-lg shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                        onClick={() => setRes(true)}
                    >
                        Search
                    </button>
                    {res && <AiResponse />}
                </div>
            )}
        </div>
    );
};

export default TrieAutocomplete;

/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const StateContext = createContext();

const StateContextProvider = (props) => {

    const [text, setText] = useState("");
    const [wordList, setWordList] = useState([]);
    const [trie, setTrie] = useState(null)

    const [AiRes, setAiRes] = useState("");

    const contextValue = {
        text, setText,
        wordList, setWordList,
        AiRes, setAiRes,
        trie, setTrie
    }

    return(
        <StateContext.Provider value={contextValue}>
            {props.children}
        </StateContext.Provider>
    )
}

export default StateContextProvider;


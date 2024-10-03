import { useContext, useEffect } from "react";
import TrieAutocomplete from "./components/TrieAutocomplete";
import { StateContext } from "./context/StateContext";

const App = () => {
    const { text, setText, setWordList } = useContext(StateContext);

    useEffect(() => {
        fetch("wordList.txt")
            .then((response) => response.text())
            .then((text) => {
                const dictArray = text.split(/\s+/);
                setWordList(dictArray);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="bg-gray-100 flex flex-col items-center min-h-screen h-auto">
            <h1 className="text-3xl sm:text-4xl font-bold sm:p-10 mt-2 p-3 sm:mt-10 text-center">
                TypeAhead Suggestions
            </h1>

            <div className="w-full max-w-lg sm:max-w-xl relative mt-5 sm:mt-0">
                {/* Search input */}
                <input
                    className="w-full p-3 sm:p-4 text-base sm:text-lg border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm  sm:mt-10"
                    onChange={(e) => {
                        var str = e.target.value
                        setText(str.toLowerCase())
                    }}
                    type="text"
                    placeholder="Search..."
                    value={text}
                />

                {/* Autocomplete suggestions */}
                {text.length >= 1 && (
                    <div className="absolute min-h-[140px] w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <TrieAutocomplete searchKey={text} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;

import { useContext, useEffect } from "react";
import TrieAutocomplete from "./components/TrieAutocomplete";
import { StateContext } from "./context/StateContext";

const App = () => {
    // const [dictionary, setDictionary] = useState([]);

    const {text, setText, setWordList} = useContext(StateContext);
    

    useEffect(() => {
        fetch('wordList.txt')
            .then(response => response.text())
            .then(text => {
                const dictArray = text.split(/\s+/);
                setWordList(dictArray);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <div className="bg-gray-100 flex flex-col items-center min-h-screen h-auto">
            <h1 className="text-4xl font-bold p-10 mt-10">TypeAhead Suggestions</h1>
            <div className="w-full max-w-xl relative translate-y-[-45px]">
                {/* Search input */}
                <input
                    className="w-full p-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm mt-20"
                    onChange={(e) => setText(e.target.value)}
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

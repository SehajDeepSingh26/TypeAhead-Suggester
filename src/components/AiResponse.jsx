import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const AiResponse = () => {
    const { text, AiRes, setAiRes } = useContext(StateContext);

    useEffect(() => {
        const generateRes = async () => {
            const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GOOGLE_API_KEY}`);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Give me meaning of "${text}" along with some example usage of the word.`;

            const result = await model.generateContent(prompt);
            setAiRes(result.response.text());
        };
        generateRes();
    }, [text]);

    return (
        <div className="bg-white shadow-md rounded-lg p-1 my-2 max-w-lg mx-auto mt-10 overflow-y-auto sm:max-w-full md:max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 text-center sm:text-left">
                Information about: <span className="text-blue-500">{text}</span>
            </h3>
            <p className={`text-lg sm:text-xl ${AiRes ? " text-gray-700" : "text-gray-500 italic"} max-h-[300px] overflow-y-auto`}>
                <ReactMarkdown>
                    {AiRes ? AiRes : "Fetching information..."}
                </ReactMarkdown>
            </p>
        </div>
    );
};

export default AiResponse;

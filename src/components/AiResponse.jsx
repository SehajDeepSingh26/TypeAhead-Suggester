import { useContext, useEffect } from "react"
import { StateContext } from "../context/StateContext"
import { GoogleGenerativeAI } from "@google/generative-ai"
import ReactMarkdown from "react-markdown"

const AiResponse = () => {
    const { text, AiRes, setAiRes } = useContext(StateContext);

    useEffect(() => {
        const generateRes = async () => {
            const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GOOGLE_API_KEY}`);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Give me meaning of ${text}`;

            const result = await model.generateContent(prompt);
            // console.log(result.response.text());
            setAiRes(result.response.text());
        };
        generateRes();
    }, [text]);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 my-4 max-w-lg mx-auto mt-10 overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Information about: <span className="text-blue-500">{text}</span>
            </h3>
            <p className={`text-lg ${AiRes ? " text-gray-700 h-[60px] overflow-auto-y" : "text-gray-500 italic overflow-y-auto "}`}>
                <ReactMarkdown>
                    {AiRes ? AiRes : "Fetching information..."}
                </ReactMarkdown>
            </p>
        </div>
    );
};

export default AiResponse;

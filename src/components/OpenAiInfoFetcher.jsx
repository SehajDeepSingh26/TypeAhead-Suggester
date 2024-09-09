/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';

const OpenAIInfoFetcher = ({ word }) => {
    const [info, setInfo] = useState('');

    const fetchInfoFromOpenAI = async () => {
        try {
            const response = await axios.post('https://api.openai.com/v1/completions', {
                model: "gpt-3.5-turbo",
                prompt: `Give information about the word: ${word}`,
                max_tokens: 100,
                temperature: 0.7,
            }, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            });

            setInfo(response.data.choices[0].text);
        } catch (error) {
            console.error('Error fetching data from OpenAI:', error);
        }
    };

    // Fetch when word changes
    useEffect(() => {
        if (word) 
            fetchInfoFromOpenAI();
    }, [word]);

    return (
        <div>
            <h3>Information about: {word}</h3>
            <p>{info ? info : "Fetching information..."}</p>
        </div>
    );
};

export default OpenAIInfoFetcher;

"use client";
import React from "react";
const ENDPOINT : string="https://gcxht6aouf.execute-api.us-east-1.amazonaws.com/prod/generate_snipet"
const SigeRios : React.FC = () => {
    const [prompt, setPrompt] = React.useState("");
    const [snippet, setSnippet] = React.useState("");
    const [hasResult, setHasResult] = React.useState(false);

        const fetchWithRetry = async (url: string, options: RequestInit = {}, retries: number = 3, backoff: number = 300): Promise<any> => {
            for (let i = 0; i < retries; i++) {
                try {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                } catch (error) {
                    if (i < retries - 1) {
                        console.warn(`Retrying fetch: attempt ${i + 2}`);
                        await new Promise(resolve => setTimeout(resolve, backoff));
                        backoff *= 2; // Exponential backoff
                    } else {
                        throw error;
                    }
                }
            }
        };
        
        const onSubmit = async (): Promise<void> => {
            console.log("submitting: " + prompt);
            try {
                const data: any = await fetchWithRetry(`${ENDPOINT}?prompt=${encodeURIComponent(prompt)}`);
                onResult(data);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        };
        
        const onResult = (data: any): void => {
            setSnippet(data.Snipet);
            setHasResult(true);
        };
        
        let resultsElement: JSX.Element | null = null;
        if (hasResult) {
            resultsElement = (
                <div>
                    Here are your results!
                    <div>Snippet: {snippet}</div>
                </div>
            );
        }
                
        
    return (
        <>
            <h1>SigeRios</h1>
            <p>
               Hi there! I d be happy to generate a snippet and keywords for your brand. Just let me know the name of your business or product, and I ll create helpful content for your marketing needs. What s the brand you d like me to work with?
            <input
            type="text" 
            placeholder="Coffee" 
            value={prompt}
            onChange={(e)=>setPrompt(e.currentTarget.value)}>
            </input>
            <button onClick={onSubmit}>Submit</button>
            <div>
            {resultsElement}
            </div>
        </>
    );
};

export default SigeRios;

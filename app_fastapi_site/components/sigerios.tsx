"use client";
import React from "react";
import Form from "./form";
import Results from "./result";
const ENDPOINT : string="https://gcxht6aouf.execute-api.us-east-1.amazonaws.com/prod/generate_snipet"

const SigeRios : React.FC = () => {
    const CHARACTER_LIMIT:number =32;
    const [prompt, setPrompt] = React.useState("");
    const [snippet, setSnippet] = React.useState("");
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading,setIsLoading] =React.useState(false)

        const fetchWithRetry = async (url: string, options: RequestInit = {}, retries: number = 3, backoff: number = 300): Promise<any> => {
            for (let i = 0; i < retries; i++) {
                try {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
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
            setIsLoading(true)
            try {
                const data: any = await fetchWithRetry(`${ENDPOINT}?prompt=${encodeURIComponent(prompt)}`);
                onResult(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
        
        const onResult = (data: any): void => {
            setSnippet(data.Snipet);
            setHasResult(true);
            setIsLoading(false);
        };
        const onReset = (): void => {
            setPrompt("");
            setHasResult(false);
            setIsLoading(false);
        };        
        let displayedElement = null;
        if (hasResult) {
            displayedElement = <Results snippet={snippet} onBack={onReset} prompt={prompt} />;
   
        } else {
            displayedElement = <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isloading={isLoading} characterLimit={CHARACTER_LIMIT} />;
        };
             
        
    return (
        <>
            <h1>SigeRios</h1>
            {displayedElement}

        </>
    );
};

export default SigeRios;
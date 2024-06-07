import React from 'react';

interface FormProps {
    prompt : string;
    setPrompt : any;
    onSubmit : any;
    isloading:boolean;
    characterLimit:number;
};


const Form : React.FC<FormProps> =(props)=>{


    const isPromptValid = props.prompt.length <=props.characterLimit;
    const updatePromptValue = (text:string)=>{
        if (text.length <= props.characterLimit) {
            props.setPrompt(text)
        }
    }

    return <>
            <p>
            Hi there! I d be happy to generate a snippet and keywords for your brand. Just let me know the name of your business or product, and I ll create helpful content for your marketing needs. What s the brand you d like me to work with?
        </p>
        <input
        type="text" 
        placeholder="Coffee" 
        value={props.prompt}
        onChange={(e)=>updatePromptValue(e.currentTarget.value)}>
        </input>
        <div>{props.prompt.length}/{props.characterLimit}</div>
        <button onClick={props.onSubmit} disabled= {props.isloading || !isPromptValid} >Submit</button>
    </>;
} ;

export default Form

interface ResultsProps {
    snippet:string;
    prompt:string;
    onBack:any;
};

const Results : React.FC<ResultsProps> = (props) =>{
    return <>    
    <div>
    <b>Your Prompt:</b> 
    </div>
    <div>{props.prompt}</div>            
    <div>
    <b>Snippet:</b> 
    </div>
    <div>{props.snippet}</div>
    <button onClick={props.onBack}>Back</button>

</>;
} ;

export default Results
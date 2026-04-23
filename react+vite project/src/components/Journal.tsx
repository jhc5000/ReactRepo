import EzraAI from "./EzraAI";
import React, { useState, useEffect } from "react";
import type {SubmitHandler}from "react-hook-form";
import { useForm} from "react-hook-form";
import type {
  TradingJournalApiService,
  TradingJournalEntry,
} from "../api/apiService/TradingJournal/TradingJournal-Api-Definitions";
import TradingJournalApiServiceImplementation from "../api/apiService/TradingJournal/TradingJournal-Api-Service";
import type { JSX } from "react/jsx-runtime";

export default function Journal() {
  const[submittedJournalEntry,setSubmittedJournalEntry]=useState({})
  const [refreshTrig,setRefreshTrig]=useState("")
  const [shouldCreateNewEntry,setshouldCreateNewEntry]=useState(false)
  const [error, setError] = useState('');
  // const [inputFieldsArr,setInputFieldsArr]=useState<any[]>([])
  let inputFieldsArr={}
  //ABSTRACT THESE
  const[symbol,setSymbol]=useState("")
  const [marketBias,setMarketBias]=useState("")
  const [setupStrategy,setSetupStrategy]=useState("")
  const [optionType,setOptionType]=useState("")
  const [stop, setStop]=useState("")
  const [entry,setEntry]=useState("")
  const [strike,setStrike]=useState("")
  const [outcome,setOutcome]=useState("")
  const [target,setTarget]=useState("")
  const[ruleAdherence,setRuleAdherence]=useState("")
  const[entryQuality,setEntryQuality]=useState("")
  const [emotionalState,setEmotionalState]=useState("")
  const [whyThisTrade,setWhyThisTrade]=useState("")
  const[chartSceenshot,setChartScreenshot]=useState("")
 
  const listHeaders = (entryObj: TradingJournalEntry) => {
    let elem: JSX.Element[] = [];
    let props = Object.keys(entryObj);
    // console.dir(entryObj);
    // console.log("jeaders", props);
    elem = props.map((entry, i) => {
      return (
        <th scope="col" className="px-6 py-4 text-center">
          {entry}
        </th>
      );
    });
    return elem;
  };

  const listRows = (entryObjects: TradingJournalEntry[]) => {
    let rows: JSX.Element[][] = [];
    entryObjects.map((entry, i) => {
      let values = Object.values(entry);
      let singleRow = values.map((val, i) => {
        return <td className="px-6 py-4 text-center">{val}</td>;
      });
      rows = [...rows, singleRow];
    });
    return rows.map((row) => {
      return <tr className="border-b dark:border-neutral-600">{row}</tr>;
    });
  };

  //CONSTRUCT DATE WITH RIGHT FORMAT
  const todaysDate=()=>{
    let date=new Date().toLocaleDateString().split("/");
    let year=date.pop();
    let reorgDate="";
    if(!!year){ 
      date=[year,...date]
      reorgDate=date.join("-")
    }
    console.log({reorgDate})
    // alert({reorgDate})
    return reorgDate
  }
  // CREATE NEW ENTRY CONTAINER
  //*research easier way to do this,LOL*
  // FIX ADHERENCE INPUT
  const createNewEntryForm=()=>{
    const entryObjsArr=[
    ["Symbol",symbol, setSymbol],
    ["MarketBias",marketBias, setMarketBias],
    ["Setup Strategy",setupStrategy,setSetupStrategy],
    ["Option Type",optionType,setOptionType],
    ["Strike",strike,setStrike],
    ["Entry",entry,setEntry],
    ["Stop",stop, setStop],
    ["Target",target,setTarget],
    ["Outcome",outcome, setOutcome],
    ["Rule Adherence",ruleAdherence, setRuleAdherence],
    ["Entry Quality",entryQuality, setEntryQuality],
    ["Emotional State",emotionalState,setEmotionalState],
    ["Why this trade",whyThisTrade,setWhyThisTrade],
    ["Chart Screenshot",chartSceenshot,setChartScreenshot]
    ]
    
    return entryObjsArr.map(entryPiece=>{
      //BUG IS HERE!!!
      let piece=entryPiece[1] ;
      // let pieceArr=[...inputFieldsArr]
      // // console.log({piece,inputFieldsArr})
      if(!!entryPiece && !!entryPiece[0]){
       console.log("TWOWTWO",{inputFieldsArr})

       //TURN THIS INTO AN OBJECT WITH THE STRING AS THE PROP, AND then update thevalue when user entwer input data
       inputFieldsArr={...inputFieldsArr,[entryPiece[0] as string]:entryPiece[1] as string}

        // setInputFieldsArr([...inputFieldsArr,(entryPiece[1] as string)])
      }
      
      return <div className="input-wrapper">
              <input
              className=" rounded-lg rounded-md rounded-sm rounded-xl bold"
              type="text"
              name={entryPiece[0]as string}
              placeholder={entryPiece[0]as string}
              value={entryPiece[1] as string}
              onChange={(event)=>(
                handleInputChange(event.target.value,entryPiece[2]as React.Dispatch<React.SetStateAction<string>>))
                // entryPiece[2]as React.Dispatch<React.SetStateAction<string>>)(event.target.value) 
              }
              />
             </div>
    })
  }

  // TESTESTESTEST!!!!
  // FORM VALIDATION
  const handleInputChange = (eventValue:any,setInputValue: React.Dispatch<React.SetStateAction<string>>) => {
    setInputValue(eventValue);
    console.log({eventValue})
    // Validate if the input is not empty
    if (!eventValue.trim()) {
      setError('This field is required.');
    } else {
      setError('');
    }
  };
  const clearNewEntryForm=()=>{
    setSymbol(""),
    setMarketBias(""),
    setSetupStrategy(""),
    setOptionType(""),
    setStrike(""),
    setEntry(""),
    setStop(""),
    setTarget(""),
    setOutcome(""),
    setRuleAdherence(""),
    setEntryQuality(""),
    setEmotionalState(""),
    setWhyThisTrade(""),
    setChartScreenshot("")
  }

  //API CALL
  const [tradingJournalEntries, setTradingJournalEntries] = useState<
    TradingJournalEntry[]
  >([]);
  useEffect(() => {
    const fetchTradingJournalEntries = async () => {
      try {
        const tradingJournalService: TradingJournalApiServiceImplementation =
          new TradingJournalApiServiceImplementation();
        const fetchedTradingJournalEntries =
          await tradingJournalService.fetchAllTradingJournalEntries();
        setTradingJournalEntries(fetchedTradingJournalEntries);
      } catch (error) {
        console.error("Error fetching trading journal entries:", error);
      }
    };
    fetchTradingJournalEntries();
  
  }, [refreshTrig]);
  
  // API post call
  // Create new journal entry
  const handleSubmit = (event:any) => {
     event.preventDefault();
    console.log({inputFieldsArr})
    let inputVals=Object.values(inputFieldsArr);
    if(inputVals.every(input=>!!(input as string).trim())){
     
      fetch("https://jubilant-pancake-g55j65qp4pjcw796-8000.app.github.dev/api/tradingjournalentries/", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
      "Date":todaysDate(),
      "Symbol": symbol,
      "Market_Bias": marketBias,
      "Setup_Strategy": setupStrategy,
      "Option_Type": optionType,
      "Strike": strike,
      "Entry": entry,
      "Stop": stop,
      "Target": target,
      "Outcome": outcome,
      "Rule_Adherence": ruleAdherence,
      "Entry_Quality": Number(entryQuality),
      "Emotional_State": emotionalState,
      "Why_this_trade": whyThisTrade,
      "Chart_Screenshot": chartSceenshot
      }),
          })
            .then((respose) => respose.json())
            .then((newEntryResp) => {
              console.log("post api response:",newEntryResp)
              setSubmittedJournalEntry(newEntryResp)
              setRefreshTrig(prev=>prev+1)
              setshouldCreateNewEntry(prev=>!prev)
              if(!!newEntryResp){
                clearNewEntryForm()
              }
              // alert("New journal entry submitted")

            })
            .catch((error) => {
              console.log(error);
            });
    }else{
      setError("Please Complete the form before submitting")
      alert(error)
    }
  };


  return (
   
      <div id="Journal" className="place-items-center">
        <h1>DayTrading Journal w/ EzraAI</h1>

        <div>
          <img
            className="mt-5 rounded-lg rounded-md rounded-sm rounded-xl"
            src="https://i.imgur.com/jA8hHMpm.jpg"
            alt="Katsuko Saruhashi"
          />
        </div>
        {/* EzraAI component */}
        <EzraAI />

        {/* THIS IS THE FORM FOR CREATING NEW ENTRIES */}
      {/* FORM VALIDATIONS! */}
        <div className="form-container">
          <button onClick={()=>setshouldCreateNewEntry(prev=>!prev)}>{!!shouldCreateNewEntry?"Close":"Open"} New Entry Form</button>
          {shouldCreateNewEntry && (
          <div className="form-wrapper  rounded-lg rounded-md rounded-sm rounded-xl"> 
            <div className="form-header">
              <p>
                Scroll Down to Submit Completed Journal Entry Form
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
            >
                {createNewEntryForm()}
             <div>
              <button style={{backgroundColor: error?"red":"default"}} disabled={error?true:false} >
                Submit
              </button>  
             </div>
            </form>
          
          </div>)}
        </div>
        {tradingJournalEntries &&
    tradingJournalEntries[0] && ( 
        <div className=" table-wrapper mt-15 overflow-x-auto bg-white dark:bg-neutral-700 rounded-lg rounded-md rounded-sm rounded-xl">
          <table className="editor_listing_table text-left text-sm whitespace-nowrap">
            <thead className="t-header uppercase tracking-wider border-b-2 dark:border-neutral-600">
           

              <tr>{listHeaders(tradingJournalEntries[0])}</tr>
            </thead>

            <tbody>{listRows(tradingJournalEntries)}</tbody>
          </table>

            {/* <button onClick={()=>submitNewTradingJournalEntry()}>create new entry</button>
            {listReturnedJournalEntry()}           */}
        </div>) }
        
      </div>
    )
  
}

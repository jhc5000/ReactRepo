import EzraAI from "./EzraAI";
import React, { useState, useEffect } from "react";
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

  //SET FOR DELETION NOW THAT I HAVE A FORM AND THE NEW JOURNAL ENTRY IS REFLECTED IN UPDATED TABLE
// const listReturnedJournalEntry = () => {
//   let newEntry:JSX.Element[] = [];
//   if(!!(Object.keys(submittedJournalEntry)[0])){
//     let props = Object.keys(submittedJournalEntry);
//     let vals = Object.values(submittedJournalEntry) as string[];
//     console.dir(props);
//     console.log("new obj keys", props);
//     newEntry = props.map((name, i) => {
//       return (
//         <div>
//             {name} - {vals[i]}
//         </div>
//       );
//     });
//   }
   
    
//     return newEntry
//   };

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
  // CREATE NEW ENTRY CONTAINER
  //*research easier way to do this,LOL*
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
      return <div className="input-wrapper">
              <input
              className=" rounded-lg rounded-md rounded-sm rounded-xl"
              type="text"
              name={entryPiece[0]as string}
              placeholder={entryPiece[0]as string}
              value={entryPiece[1] as string}
              onChange={(event)=>(entryPiece[2]as React.Dispatch<React.SetStateAction<string>>)(event.target.value) }
              />
             </div>
    })
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
    fetch("https://jubilant-pancake-g55j65qp4pjcw796-8000.app.github.dev/api/tradingjournalentries/", {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
    "Date":new Date().toLocaleDateString().split("/").join("-"),
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

          })
          .catch((error) => {
            console.log(error);
          });
  };

  const submitNewTradingJournalEntry=()=>{

       fetch("https://jubilant-pancake-g55j65qp4pjcw796-8000.app.github.dev/api/tradingjournalentries/", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
    "Date": "2026-03-08",
    "Symbol": "NTFLX",
    "Market_Bias": "Looking good",
    "Setup_Strategy": "breakout 15 minute strategy",
    "Option_Type": "Test",
    "Strike": "600",
    "Entry": "2.50",
    "Stop": "2.40",
    "Target": "3.00",
    "Outcome": "3.50",
    "Rule_Adherence": "50",
    "Entry_Quality": 45,
    "Emotional_State": "content",
    "Why_this_trade": "good strategy adherncr",
    "Chart_Screenshot": "image url"
}),
    })
      .then((respose) => respose.json())
      .then((newEntryResp) => {
        console.log("post api response:",newEntryResp)
        setSubmittedJournalEntry(newEntryResp)
        setRefreshTrig(prev=>prev+1)
      })
      .catch((error) => {
        console.log(error);
      });
    }

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
        <div className="form-container">
          <button onClick={()=>setshouldCreateNewEntry(prev=>!prev)}>{!!shouldCreateNewEntry?"Close":"Open"} New Entry Form</button>
          {shouldCreateNewEntry && (
          <div className="form-wrapper  rounded-lg rounded-md rounded-sm rounded-xl"> 
            <div className="form-header">
              <p>
                Complete and Scroll Down to Submit Journal Entry
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
            >
                {createNewEntryForm()}
             <div>
              <button >
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

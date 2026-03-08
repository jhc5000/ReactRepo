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
 
  const listHeaders = (entryObj: TradingJournalEntry) => {
    let elem: JSX.Element[] = [];
    let props = Object.keys(entryObj);
    console.dir(entryObj);
    console.log("jeaders", props);
    elem = props.map((entry, i) => {
      return (
        <th scope="col" className="px-6 py-4 text-center">
          {entry}
        </th>
      );
    });
    return elem;
  };
const listReturnedJournalEntry = () => {
  let newEntry:JSX.Element[] = [];
  if(!!(Object.keys(submittedJournalEntry)[0])){
    let props = Object.keys(submittedJournalEntry);
    let vals = Object.values(submittedJournalEntry) as string[];
    console.dir(props);
    console.log("new obj keys", props);
    newEntry = props.map((name, i) => {
      return (
        <div>
            {name} - {vals[i]}
        </div>
      );
    });
  }
   
    
    return newEntry
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
    
    // Create new journal entry
    const submitNewTradingJournalEntry=async()=>{

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
        
        // navigate("/Reviews");
      })
      .catch((error) => {
        console.log(error);
      });
    }
    submitNewTradingJournalEntry();
   
  }, []);

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
        {tradingJournalEntries &&
    tradingJournalEntries[0] && ( 
        <div className=" table-wrapper mt-15 overflow-x-auto bg-white dark:bg-neutral-700 rounded-lg rounded-md rounded-sm rounded-xl">
          <table className="editor_listing_table text-left text-sm whitespace-nowrap">
            <thead className="t-header uppercase tracking-wider border-b-2 dark:border-neutral-600">
           

              <tr>{listHeaders(tradingJournalEntries[0])}</tr>
            </thead>

            <tbody>{listRows(tradingJournalEntries)}</tbody>
          </table>
            {listReturnedJournalEntry()}

            {/* {Object.keys(submittedJournalEntry[0])&&submittedJournalEntry.map(entry=>{
              console.log(submittedJournalEntry)
              let newDiv=Object.keys(entry).map((key,i)=>{
                let vals:string[]=Object.values(entry)
                return(<p>{key}:{vals[i]}</p>)
              })
              return(
                <div>{newDiv}</div>
              )
            })} */}
          
        </div>) }
        
      </div>
    )
  
}

import EzraAI from "./EzraAI";
import React, { useState, useEffect } from "react";
import type {
  TradingJournalApiService,
  TradingJournalEntry,
} from "../api/apiService/TradingJournal/TradingJournal-Api-Definitions";
import TradingJournalApiServiceImplementation from "../api/apiService/TradingJournal/TradingJournal-Api-Service";
import type { JSX } from "react/jsx-runtime";

export default function Journal() {
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
  }, []);

  return (
    tradingJournalEntries &&
    tradingJournalEntries[0] && (
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
        {/* <!-- Table responsive wrapper --> */}
        <div className=" table-wrapper mt-15 overflow-x-auto bg-white dark:bg-neutral-700 rounded-lg rounded-md rounded-sm rounded-xl">
          {/* <!-- Table --> */}
          <table className="editor_listing_table text-left text-sm whitespace-nowrap">
            {/* <!-- Table head --> */}
            <thead className="t-header uppercase tracking-wider border-b-2 dark:border-neutral-600">
              {/* { <tr>{listHeaders}</tr>} */}

              <tr>{listHeaders(tradingJournalEntries[0])}</tr>
            </thead>

            {/* <!-- Table body --> */}
            <tbody>{listRows(tradingJournalEntries)}</tbody>
          </table>
        </div>
      </div>
    )
  );
}

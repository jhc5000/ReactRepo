import type {
  TradingJournalApiService,
  TradingJournalEntry,
} from "./TradingJournal-Api-Definitions";

class TradingJournalApiServiceImplementation
  implements TradingJournalApiService
{
  async fetchAllTradingJournalEntries(): Promise<TradingJournalEntry[]> {
    try {
      const response = await fetch(
        "https://4trcq7-8000.csb.app/api/tradingjournalentries/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      console.log("test:", data);
      return this.fixJournalEntries(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  }
  fixJournalEntries(data: TradingJournalEntry[]): TradingJournalEntry[] {
    let newJournalEntries: TradingJournalEntry[] = [];

    data.map((entry, i) => {
      let values = Object.values(entry);
      let updatedEntry: TradingJournalEntry = {
        id: values[0],
        Date: values[1],
        Symbol: values[2],
        "Market Bias": values[3],
        "Setup/Strategy": values[4],
        "Option Type": values[5],
        Strike: values[6],
        "Entry(size@price)": values[7],
        "Stop(Risk Mgmt ~0.5*)": values[8],
        "Target(1.5R)": values[9],
        Outcome: values[9],
        "Rule Adherence(%)": values[10],
        "Entry Quality(fit setup?)": values[11],
        "Emotional State": values[12],
        "Why this trade?": values[13],
        "Chart Screenshot": values[14],
      };
      newJournalEntries = [...newJournalEntries, updatedEntry];
    });
    console.dir(newJournalEntries);
    return newJournalEntries;
  }
}

export default TradingJournalApiServiceImplementation;

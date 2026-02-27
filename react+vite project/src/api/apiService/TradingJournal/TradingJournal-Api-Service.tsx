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
      return data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  }
}

export default TradingJournalApiServiceImplementation;

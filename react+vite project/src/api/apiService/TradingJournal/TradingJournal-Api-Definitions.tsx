export interface TradingJournalApiService {
  fetchAllTradingJournalEntries(): Promise<TradingJournalEntry[]>;
}

export interface TradingJournalEntry {
  id: number;
  Date: string;
  Symbol: string;
  "Market Bias": string;
  "Setup/Strategy": string;
  "Option Type": string;
  Strike: number;
  "Entry(size@price)": number;
  "Stop(Risk Mgmt ~0.5*)": number;
  "Target(1.5R)": number;
  Outcome: number;
  "Rule Adherence(%)": number;
  "Entry Quality(fit setup?)": string;
  "Emotional State": string;
  "Why this trade?": string;
  "Chart Screenshot": File;
  // Add more properties as needed
}

export interface TradingJournalEntryPOST {
  id: number;
  Date: string;
  Symbol: string;
  "Market Bias": string;
  "Setup/Strategy": string;
  "Option Type": string;
  Strike: number;
  "Entry(size@price)": number;
  "Stop(Risk Mgmt ~0.5*)": number;
  "Target(1.5R)": number;
  Outcome: number;
  "Rule Adherence(%)": number;
  "Entry Quality(fit setup?)": string;
  "Emotional State": string;
  "Why this trade?": string;
  "Chart Screenshot": File;
  // Add more properties as needed
}

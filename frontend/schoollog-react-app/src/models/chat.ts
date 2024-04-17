export interface ChatMessage {
  id: number;
  message: string;
  date: string;
  time: string;
  isLoading: boolean;
  answer?: string;
  sender: string;
}

export interface ChatHistoryMessage {
  sender: string;
  date: string;
  time: string;
  message: string;
}

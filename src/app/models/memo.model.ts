export enum MemoStatus {
  Open = 0,
  ToDo = 1,
  InProgress = 2,
  Completed = 3,
  Close = 4,
  ReOpen = 5,
}

export interface MemoListResponse {
  items: Memo[];
  summary: MemoSummary;
}

export interface Memo {
  id: number;
  title: string;
  status: MemoStatus;
}

export interface MemoSummary {
  totalCount: number;
  completedCount: number;
}

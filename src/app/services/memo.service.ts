import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export enum MemoStatus {
  Open = 0,
  ToDo = 1,
  InProgress = 2,
  Completed = 3,
  Close = 4,
  ReOpen = 5,
}

export interface Memo {
  id: number;
  title: string;
  status: MemoStatus;
}

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  private apiUrl = `${environment.apiBaseUrl}/api/Memos`;

  constructor(private http: HttpClient) {}

  getMemos(): Observable<Memo[]> {
    return this.http.get<Memo[]>(this.apiUrl);
  }
}

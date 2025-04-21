import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Memo {
  id: number;
  title: string;
  status: number;
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

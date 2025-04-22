import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Memo } from '@models/memo.model';

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  private apiUrl = `${environment.apiBaseUrl}/api/Memos`;

  constructor(private http: HttpClient) {}

  getMemos(): Observable<Memo[]> {
    return this.http.get<Memo[]>(this.apiUrl);
  }

  addMemo(memo: Omit<Memo, 'id'>): Observable<Memo> {
    return this.http.post<Memo>(`${this.apiUrl}`, memo);
  }
}

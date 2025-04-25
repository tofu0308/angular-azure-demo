import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Memo, MemoStatus, MemoListResponse } from '@models/memo.model';

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  private apiUrl = `${environment.apiBaseUrl}/api/Memos`;

  constructor(private http: HttpClient) {}

  getMemos(): Observable<MemoListResponse> {
    return this.http.get<MemoListResponse>(this.apiUrl);
  }

  addMemo(memo: Omit<Memo, 'id'>): Observable<Memo> {
    return this.http.post<Memo>(`${this.apiUrl}`, memo);
  }

  updateMemoStatus(id: number, status: MemoStatus): Observable<any> {
    const url = `${this.apiUrl}/${id}/status`;
    return this.http.patch(url, { status: Number(status) });
  }

  deleteMemo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

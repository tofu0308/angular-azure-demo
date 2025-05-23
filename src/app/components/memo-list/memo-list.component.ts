import { Component, OnInit } from '@angular/core';
import { MemoService } from '../../services/memo.service';
import { NgFor } from '@angular/common';
import { MemoStatus, Memo, MemoSummary } from '@models/memo.model';
import { FormsModule } from '@angular/forms';
import { MemoStatusFilterPipe } from '@pipes/memo-status-filter.pipe';

@Component({
  selector: 'app-memo-list',
  imports: [NgFor, FormsModule, MemoStatusFilterPipe],
  templateUrl: './memo-list.component.html',
})
export class MemoListComponent implements OnInit {
  memos: Memo[] = [];
  memoSummary: MemoSummary = {
    totalCount: 0,
    completedCount: 0,
  };
  memoStatuses = [
    { value: 0, label: '未着手' },
    { value: 1, label: '進行中' },
    { value: 2, label: '確認中' },
    { value: 3, label: '完了' },
  ];
  filterStatus: number | null = null;
  newMemoTitle = '';

  constructor(private memoService: MemoService) {}

  ngOnInit(): void {
    this.getMemos();
  }

  getMemos() {
    this.memoService.getMemos().subscribe((data) => {
      this.memos = data.items;
      this.memoSummary = data.summary;
    });
  }

  addMemo() {
    const newMemo: Omit<Memo, 'id'> = {
      title: this.newMemoTitle,
      status: MemoStatus.Open,
    };

    if (this.newMemoTitle === '') return;

    this.memoService.addMemo(newMemo).subscribe(() => {
      this.getMemos(); // 一覧再取得
      this.newMemoTitle = '';
    });
  }

  changeStatus(memo: Memo, newStatus: MemoStatus): void {
    this.memoService.updateMemoStatus(memo.id, newStatus).subscribe(() => {
      this.getMemos();
    });
  }

  deleteMemo(id: number): void {
    this.memoService.deleteMemo(id).subscribe(() => {
      this.getMemos();
    });
  }
}

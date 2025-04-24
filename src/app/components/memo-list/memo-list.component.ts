import { Component, OnInit } from '@angular/core';
import { MemoService } from '../../services/memo.service';
import { NgFor } from '@angular/common';
import { MemoStatus, Memo } from '@models/memo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-memo-list',
  imports: [NgFor, FormsModule],
  templateUrl: './memo-list.component.html',
})
export class MemoListComponent implements OnInit {
  memos: Memo[] = [];
  memoStatuses = [
    { value: 0, label: '未着手' },
    { value: 1, label: '進行中' },
    { value: 2, label: '確認中' },
    { value: 3, label: '完了' },
  ];
  newMemoTitle = '';

  constructor(private memoService: MemoService) {}

  ngOnInit(): void {
    this.getMemos();
  }

  getMemos() {
    this.memoService.getMemos().subscribe((data) => {
      this.memos = data;
    });
  }

  addMemo() {
    const newMemo: Omit<Memo, 'id'> = {
      title: this.newMemoTitle,
      status: MemoStatus.Open,
    };

    this.memoService.addMemo(newMemo).subscribe(() => {
      this.getMemos(); // 一覧再取得
      this.newMemoTitle = '';
    });
  }

  changeStatus(memo: Memo, newStatus: MemoStatus): void {
    console.log('change');
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

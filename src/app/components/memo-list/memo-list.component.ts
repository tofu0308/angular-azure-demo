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

  constructor(private memoService: MemoService) {}

  ngOnInit(): void {
    this.getMemos();
  }

  getMemos() {
    this.memoService.getMemos().subscribe((data) => {
      this.memos = data;
    });
  }

  newMemoTitle = '';
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
    this.memoService.updateMemoStatus(memo.id, newStatus).subscribe(() => {
      this.getMemos();
    });
  }
}

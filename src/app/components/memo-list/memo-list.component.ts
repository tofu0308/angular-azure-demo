import { Component, OnInit } from '@angular/core';
import { MemoService, Memo } from '../../services/memo.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-memo-list',
  imports: [NgFor],
  templateUrl: './memo-list.component.html',
})
export class MemoListComponent implements OnInit {
  memos: Memo[] = [];

  constructor(private memoService: MemoService) {}

  ngOnInit(): void {
    this.memoService.getMemos().subscribe((data) => {
      this.memos = data;
    });
  }
}

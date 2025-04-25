import { Pipe, PipeTransform } from '@angular/core';
import { Memo } from '@models/memo.model';

@Pipe({
  name: 'memoStatusFilter',
})
export class MemoStatusFilterPipe implements PipeTransform {
  transform(memos: Memo[], status: number | null): Memo[] {
    if (status === null) return memos;
    return memos.filter((memo) => memo.status === status);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../modules/itask';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(
    value: Array<ITask>,
    order: 'text' | 'isDone',
    reverse: boolean
  ): Array<ITask> {
    // TODO: переделать пайп под типы
    if (order === 'text') {
      value.sort((a, b) =>
        a[order].toLowerCase() > b[order].toLowerCase() ? 1 : -1
      );
    } else if (order === 'isDone') {
      value.sort((a, b) => (Number(a[order]) > Number(b[order]) ? 1 : -1));
    }

    if (reverse) {
      value.reverse();
    }

    return value;
  }
}

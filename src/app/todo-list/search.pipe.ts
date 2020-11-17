import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../modules/itask';

@Pipe({
  name: 'search',
  pure: false,
})
export class SearchPipe implements PipeTransform {
  transform(value: Array<ITask>, search: string): Array<ITask> {
    return value.filter(
      (task) => task.text.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  }
}

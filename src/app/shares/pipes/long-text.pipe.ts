import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'longtext' })
export class LongTextPipe implements PipeTransform {
  transform(value: string) {
    return  value.substring(0, 50) + '.....';

  }
}
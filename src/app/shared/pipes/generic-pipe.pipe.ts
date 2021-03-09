import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import Options from '../models/options.model';

@Pipe({
  name: 'genericPipe'
})
export class GenericPipe implements PipeTransform {

  transform(value: any, args: Options, index?: number): any {
    if (!value) {
      return '-';
    }

    if (args.prop && value instanceof Object) {
      if (args.prop instanceof Array) {
        value = value[args.prop[index]];
      } else {
        value = value[args.prop];
      }
    }

    if (args.mask) {
      let maskArray = '';
      if (args.mask instanceof Array) {
        if (args.mask[index]) {
          maskArray = args.mask[index].split('0');
        }
      } else {
        maskArray = args.mask.split('0');
      }
      if (maskArray) {
        value = value.split('');
        const newValueArray = value.map((char, i) => maskArray[i] !== '' ? maskArray[i] + char : char);
        return newValueArray.join('');
      }
    }

    if (args.dateFormat) {
      return moment(value, 'YYYY-MM-DD[T]HH:mm:ss').format(args.dateFormat);
    }

    if (args.customFormat) {
      return args.customFormat(value);
    }

    return value;
  }
}

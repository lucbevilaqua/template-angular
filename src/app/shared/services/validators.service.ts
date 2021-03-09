import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  private emailPattern = '[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+';
  private numberPattern = '^[0-9]*$';
  private ipPattern = '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$';

  isCpf(control: FormControl) {
    if (control.value) {
      const arrayFirstCalc = [10, 9, 8, 7, 6, 5, 4, 3, 2];
      const arraySecondCalc = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
      const cpf = control.value.split('');
      let firstCalc: number = null;
      let result = null;

      cpf.forEach((value, i) => {
        if (i !== 9) {
          firstCalc += (+value * arrayFirstCalc[i]);
        } else {
          result = (firstCalc * 10) % 11 === 10 ? 0 : (firstCalc * 10) % 11;
        }
      });

      if (result === +control.value[9]) {
        let secondCalc: number = null;
        cpf.forEach((value, i) => {
          secondCalc += (value * arraySecondCalc[i]);
          if (i === 9) {
            result = (secondCalc * 10) % 11;
          }
        });
        if (result === +control.value[10]) {
          return true;
        }
      }
      return { invalidcpf: true };
    } else {
      return true;
    }
  }

  isEmail() {
    // tslint:disable-next-line:semicolon
    return Validators.pattern(this.emailPattern)
  }

  invalidIP() {
    // tslint:disable-next-line:semicolon
    return Validators.pattern(this.ipPattern)
  }

  isNumber() {
    // tslint:disable-next-line:semicolon
    return Validators.pattern(this.numberPattern)
  }

  invalidDate(control: FormControl) {
    // return timer(500).pipe(
    //   map(() => {
    if (!moment(control.value, 'DD/MM/YYYY').isValid()) {
      return { invalidData: true };
    }
    return true;
    //   })
    // );
  }

  isADatePeriod(start, end) {
    // return timer(500).pipe(
    //   map(() => {
    if (start.value && end.value) {
      start = moment(start.value, 'DD/MM/YYYY').format('YYYY-MM-DD');
      end = moment(end.value, 'DD/MM/YYYY').format('YYYY-MM-DD');
      return moment(start).isBefore(end) ? true : { invalidData: true };
    } else {
      return true;
    }
    // }));
  }
}

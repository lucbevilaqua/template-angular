import { Injectable } from '@angular/core';
import * as moment from 'moment';
moment.locale('pt-br');

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  private regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  setFormData(form: any, data: any) {
    // set values of data in form
    Object.keys(form.controls).forEach(key => {
      this[key].setValue(data[key] || null);
    });
  }

  markAsDirtyForm(form: any) {
    Object.keys(form.controls).forEach(key => {
      try {
        if (this[key].value === null || this[key].value.length === 0 && this[key].hasError('required')) {
          this[key].markAsDirty();
        }
      } catch (error) {
        throw Error('Um erro Ocorreu.');
      }
    });
  }

  createFormData(form: any) {
    const request = new FormData();

    for (const property in form) {
      if (form[property]) {
        // check if the field is date
        if (form[property].toString().match(this.regexDate)) {
          request.append(property, moment(form[property], 'DD/MM/YYYY').format('YYYY-MM-DD'));
        } else if (form[property] instanceof Array) {
          request.append(property, `[${form[property]}]`);
        } else {
          request.append(property, form[property]);
        }
      }
    }

    return request;
  }
}

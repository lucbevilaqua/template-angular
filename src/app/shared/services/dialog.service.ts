import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Dialog from '../models/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private subject = new Subject<Dialog>();

  data$ = this.subject.asObservable();

  confirm(title: string, message: string, success: () => void) {
    this.subject.next({ title, message, success });
  }

  constructor() { }
}

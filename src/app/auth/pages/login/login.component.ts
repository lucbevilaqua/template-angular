import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { LoginRequested } from '../../auth.actions';
import { selectAuthLoading } from '../../auth.selectors';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('firstInput', { static: true }) firstInput: ElementRef<HTMLInputElement>;

  form: FormGroup;
  loading$ = this.store.pipe(select(selectAuthLoading));
  remember = this.fb.control(null);

  constructor(private fb: FormBuilder, private store: Store<AppState>,  private utilsService: UtilsService) {
    this.form = this.fb.group({
      email: [''],
      password: [''],
      remember: false
    });

    const user = this.utilsService.decrypt(localStorage.getItem('login.user'));

    if (user.remember) {
      this.form.controls.email.setValue(user.email);
      this.form.controls.password.setValue(user.password);
      this.form.controls.remember.setValue(user.remember);
    } else {
      localStorage.removeItem('login.user');
    }
  }

  ngAfterViewInit() {
    this.firstInput.nativeElement.focus();
  }

  onSubmit() {
    this.store.dispatch(new LoginRequested(this.form.value));
  }

}

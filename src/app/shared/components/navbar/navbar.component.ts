import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/auth/auth.reducer';
import { selectAuthUser } from 'src/app/auth/auth.selectors';
import { SharedState } from '../../shared.reducer';
import Permissions from '../../../shared/enums/permissions.enum';
import { PermissionService } from '../../services/permission.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/reducers';
import { Logout } from 'src/app/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public Permissions = Permissions;

  constructor(
    public router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new Logout({ error: '' }));
  }
}

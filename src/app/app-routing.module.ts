import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PermissionGuard } from './shared/guards/permission.guard';
import Permission from './shared/enums/permissions.enum';
import { MasterPageComponent } from './shared/pages/master-page/master-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MasterPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule',
        canActivate: [PermissionGuard],
        data: { permissions: [] }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedEffects } from './shared.effects';
import { reducer as SharedReducer } from './shared.reducer';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertComponent } from './components/alert/alert.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyPermissionDirective } from './directives/has-any-permission.directive';
import { MasterPageComponent } from './pages/master-page/master-page.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ModalComponent } from './components/modal/modal.component';
import { CloseModalDirective } from './directives/close-modal.directive';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { GenericCrudTableComponent } from './components/generic-crud-table/generic-crud-table.component';
import { GenericPageComponent } from './components/generic-page/generic-page.component';
import { NgxMaskModule } from 'ngx-mask';
import { GenericPipe } from './pipes/generic-pipe.pipe';

@NgModule({
  declarations: [
    HasPermissionDirective,
    HasAnyPermissionDirective,
    CloseModalDirective,
    LoadingComponent,
    AlertComponent,
    NavbarComponent,
    MasterPageComponent,
    DialogComponent,
    ModalComponent,
    GenericTableComponent,
    GenericCrudTableComponent,
    GenericPageComponent,
    GenericPipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    EffectsModule.forFeature([ SharedEffects ]),
    StoreModule.forFeature('shared', SharedReducer)
  ],
  exports: [
    HasPermissionDirective,
    HasAnyPermissionDirective,
    NavbarComponent,
    LoadingComponent,
    DialogComponent,
    AlertComponent,
    CloseModalDirective,
    GenericPageComponent,
    ModalComponent,
    GenericCrudTableComponent,
    GenericTableComponent,
  ]
})
export class SharedModule { }

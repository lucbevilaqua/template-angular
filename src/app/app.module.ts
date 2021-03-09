import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth-interceptor';
import { AuthEffects } from './auth/auth.effects';
import { HomeModule } from './home/home.module';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { UtilsService } from './shared/services/utils.service';
import { AlertService } from './shared/services/alert.service';
import { SentryErrorHandler } from './shared/services/sentry-error.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    HomeModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ AuthEffects ])
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    FormBuilder,
    UtilsService,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

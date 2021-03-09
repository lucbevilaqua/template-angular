import { Injectable, ErrorHandler } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { environment } from '../../../environments/environment';
Sentry.init({
  dsn: environment.sentryDsn
});

@Injectable({
  providedIn: 'root'
})
export class SentryErrorHandler {

  handleError(error) {
    Sentry.captureException(error.originalError || error);
    console.error(error);
  }
}

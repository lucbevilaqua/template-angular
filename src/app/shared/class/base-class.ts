import { UtilsService } from '../services/utils.service';
import { AppInjector } from '../services/appInjector.service';
import { FormBuilder } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { AlertService } from '../services/alert.service';

export class BaseClass {
    protected fb: FormBuilder;
    protected dialog: DialogService;
    protected utils: UtilsService;
    protected alert: AlertService;

    constructor() {
        const injector = AppInjector.getInjector();
        this.fb = injector.get(FormBuilder);
        this.dialog = injector.get(DialogService);
        this.utils = injector.get(UtilsService);
        this.alert = injector.get(AlertService);
        this.logNavigation();
    }

    protected logError(errorMessage: string) { }

    private logNavigation() {  }
}

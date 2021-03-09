import { UtilsService } from '../services/utils.service';
import { AppInjector } from '../services/appInjector.service';
import { FormBuilder } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { AlertService } from '../services/alert.service';
import { ComboService } from '../services/combo.service';
import { StateService } from '../services/state.service';

export class BaseClass {
    protected fb: FormBuilder;
    protected comboService: ComboService;
    protected stateService: StateService;
    protected dialog: DialogService;
    protected utils: UtilsService;
    protected alert: AlertService;

    constructor() {
        const injector = AppInjector.getInjector();
        this.fb = injector.get(FormBuilder);
        this.comboService = injector.get(ComboService);
        this.stateService = injector.get(StateService);
        this.dialog = injector.get(DialogService);
        this.utils = injector.get(UtilsService);
        this.alert = injector.get(AlertService);
        this.logNavigation();
    }

    protected logError(errorMessage: string) { }

    private logNavigation() {  }
}

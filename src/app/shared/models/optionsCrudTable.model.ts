import ConfigSelect from './configSelect.model';

class OptionsCrudTable {
    inputType?: string;
    validators: any;
    updateOn?: 'change' | 'blur' | 'submit';
    configSelect?: ConfigSelect;
    mask?: string;
    dateFormat?: string;
    dropSpecialCharacters?: boolean;
    readonly?: any;

    constructor() {
        this.inputType = 'text';
        this.configSelect = new ConfigSelect();
        this.validators = [];
        this.updateOn = 'change';
        this.mask = '';
        this.dateFormat = '';
        this.dropSpecialCharacters = false;
        this.readonly = null;
    }
}

export default OptionsCrudTable;

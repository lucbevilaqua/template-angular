class ConfigSelect {
    key?: string;
    text?: string;
    multiple?: boolean;
    closeOnSelect?: boolean;
    onChange?: any;
    request: CallableFunction;

    constructor() {
        this.key = 'id';
        this.text = 'text';
        this.multiple = false;
        this.closeOnSelect = true;
        this.onChange = null;
    }
}

export default ConfigSelect;

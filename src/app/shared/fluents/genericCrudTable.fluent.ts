import OptionsCrudTable from '../models/optionsCrudTable.model';
import ConfigSelect from '../models/configSelect.model';

export class GenericCrudTableFluent {
    public columns = [];
    public columnsHide = [];
    public headers = [];
    constructor() { }

    addTableColumn(text: any, key: any, options: OptionsCrudTable = new OptionsCrudTable()) {
        if (options.inputType === 'select') {
            this.validConfigSelect(options);
        }

        this.columns.push({ text, key, options });
        return this;
    }

    addTableColumnHide(key: string) {
        this.columnsHide.push(key);
        return this;
    }

    addTableHeader(text: string[]) {
        this.headers = text;
        return this;
    }

    private validConfigSelect(options) {
        const configSelect = new ConfigSelect();
        Object.keys(configSelect).forEach(key => {
            if (!options.configSelect[key] && key !== 'onChange') {
                options.configSelect[key] = configSelect[key];
            }
        });
        return options;
    }
}

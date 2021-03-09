import Options from '../models/options.model';
import Tab from '../models/tab.model';
import OptionsLineAction from '../models/optionsLineAction.model';

export class GenericTableFluent {
    public columns = [];
    public actions = [];
    public menuNavigation = [];
    public headerButtons = [];
    public columnCustom = [];
    public ignoreHeader = false;
    public activeTab = 1;
    public headerTemplate: any;
    public lineStyle: any;
    public messageForEmptyTable = 'Não há dados a serem exibidos';

    constructor() { }

    addTableColumn(text: any, key: any, options: Options = { }) {
        this.columns.push({ text, key, options });
        return this;
    }

    ignoreTableHeader() {
        this.ignoreHeader = true;
        return this;
    }

    addLineAction(text: string, icon: string, btnClass: string, onClick: CallableFunction, options?: OptionsLineAction) {
        this.actions.push({ text, icon, btnClass, onClick, options });
        return this;
    }

    addNavigation(tab: Tab[]) {
        tab[0].configTable = this;
        this.menuNavigation = tab;
        return this;
    }

    addHeaderFilter(headerTemplate) {
        this.headerTemplate = headerTemplate;
        return this;
    }

    addTableColumnCustom(text, columnTemplate) {
        this.columnCustom.push({ text, columnTemplate });
        return this;
    }

    /**
     * Style the line on which it receives a style object
     * @argument (CallableFunction)
     * @return - { background: 'red' }
     */
    lineCustomStyle(rule: any) {
        this.lineStyle = rule;
        return this;
    }

    addHeaderButton(text, callback, type = 'btn-outline-primary', icon?) {
        this.headerButtons.push({ text, callback, type, icon });
        return this;
    }

    addCustomMessageForEmptyTable(message) {
        this.messageForEmptyTable = message;
        return this;
    }
}

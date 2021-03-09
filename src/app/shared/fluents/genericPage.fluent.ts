import { GenericTableFluent } from './genericTable.fluent';
import OptionsLineAction from '../models/optionsLineAction.model';
import MenuOptions from '../models/menuOptions.model';

export class GenericPageFluent {
    public title = '';
    public table = null;
    public footerButtons = [];
    public headerButtons = [];
    public itemsPerPage = 10;
    public activeNavigation = 0;
    public requestService: any;

    constructor() { }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setTable(table: GenericTableFluent) {
        this.table = table;
        return this;
    }

    setItemsPerPage(itemsPerPage: number) {
        this.itemsPerPage = itemsPerPage;
        return this;
    }

    setRequestService(requestService) {
        this.requestService = requestService;
        return this;
    }

    addFooterButton(text, callback, type = 'btn-outline-primary', icon, options?: MenuOptions) {
        this.footerButtons.push({ text, callback, type, icon, options });
        return this;
    }

    addHeaderButton(text, callback, type = 'btn-outline-primary', icon) {
        this.headerButtons.push({ text, callback, type, icon });
        return this;
    }

    initializeTab(tabId) {
        this.activeNavigation = tabId;
        return this;
    }
}

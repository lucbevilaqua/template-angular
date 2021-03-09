import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseClass } from 'src/app/shared/class/base-class';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { ModalExempleComponent } from '../../components/modal-exemple/modal-exemple.component';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import Permissions from '../../../shared/enums/permissions.enum';
import { GenericPageComponent } from 'src/app/shared/components/generic-page/generic-page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseClass implements OnInit {
  @ViewChild(ModalExempleComponent, { static: true }) modalExemple: ModalExempleComponent;
  @ViewChild('genericPage', { static: true }) genericPage: GenericPageComponent;
  @ViewChild('templateFiltere', { static: true }) templateFiltere: ElementRef;
  Permissions = Permissions;
  modelChanged: Subject<any> = new Subject<any>();
  exempleList = [];
  configExemple;
  config;

  constructor() {
    super();
    this.modelChanged.pipe(
      debounceTime(700),
      distinctUntilChanged()
    )
    .subscribe(obj => {
      if (obj.text.length >= 3 || !obj.text) {
        this[obj.id] = obj.text;
        this[obj.table].getData();
      }
    });
  }

  ngOnInit() {
    // request and get list (required  to have the list request in comboService)
    // this.stateService.requestList({ key: 'exempleList', request: 'exemple' });
    // this.stateService.getList('exempleList')
    //   .subscribe(response => this.exempleList = response);
    this.configs();
    this.config = new GenericPageFluent()
      .setTitle('Titulo da Pagina')
      .setTable(this.configExemple)
      .setItemsPerPage(10);

    this.modelChanged.next({ id: 'exempleFilter', text: 'new value', table: 'genericPage' });
  }

  showAlert() {
    this.alert.success('Exemplo de mensagem de alerta');
  }

  showDialog() {
    this.dialog.confirm('Titulo', 'Mensagem', () => {
      this.alert.success('Apertou confirma');
    });
  }

  configs() {
      this.configExemple = new GenericTableFluent()
        .addHeaderButton('Exemplo Botão Header Modal', (data) => this.modalExemple.show(), 'btn-brown', '')
        .addHeaderFilter(this.templateFiltere)
        .addNavigation([
          {
            text: 'Tabela 1',
            configTable: this.configExemple,
            requestService: (params) => null
          }
        ])
        .addTableColumn('Id', 'id')
        .addTableColumn('Column 1', 'column1', { customFormat: (value) => value.length })
        .addLineAction('', 'icon-edit', '', (data) => {
          this.modalExemple.show(data);
        });
  }
}

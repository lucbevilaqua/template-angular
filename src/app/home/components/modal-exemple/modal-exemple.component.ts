import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseClass } from 'src/app/shared/class/base-class';
import { GenericCrudTableComponent } from 'src/app/shared/components/generic-crud-table/generic-crud-table.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { GenericCrudTableFluent } from 'src/app/shared/fluents/genericCrudTable.fluent';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import ModalSize from 'src/app/shared/enums/modal-size.enum';

@Component({
  selector: 'app-modal-exemple',
  templateUrl: './modal-exemple.component.html',
  styleUrls: ['./modal-exemple.component.scss']
})
export class ModalExempleComponent extends BaseClass implements OnInit {
  @ViewChild(ModalComponent, { static: true }) modalComponent: ModalComponent;
  @ViewChild('genericCrudTable', { static: false }) genericCrudTable: GenericCrudTableComponent;
  @Output() emitResult = new EventEmitter<any>();

  modalSize = ModalSize;
  configCrudTable;

  crudList = [
    { id: 1, description: 'description'}
  ];

  form: FormGroup;

  constructor(private validators: ValidatorsService) {
    super();

    this.form = this.fb.group({
      field: this.fb.control('', [Validators.required, Validators.maxLength(250)])
    });
  }

  ngOnInit() {
    this.configCrudTable = new GenericCrudTableFluent()
    .addTableHeader(['Col 1', 'col2'])
    .addTableColumn('', 'id', {
      validators: [Validators.required],
      inputType: 'text',
    })
    .addTableColumn('', 'description', {
      validators: [Validators.nullValidator, this.validators.isNumber()],
      inputType: 'text',
    });
  }

  addData() {
    this.genericCrudTable.setDataOfTable(this.crudList);
  }

  show(data?) {
    this.modalComponent.show();
  }

  hide() {
    this.genericCrudTable.resetTable();
    this.modalComponent.hide();
  }
}

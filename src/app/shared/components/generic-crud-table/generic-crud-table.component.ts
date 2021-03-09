import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseClass } from '../../class/base-class';
import { FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-generic-crud-table',
  templateUrl: './generic-crud-table.component.html',
  styleUrls: ['./generic-crud-table.component.scss'],
})
export class GenericCrudTableComponent extends BaseClass {
  @Input() config;
  @Input() maxHeight = 250;
  @Input() resultList;
  @Output() resultListChange = new EventEmitter();
  form: any = this.fb.group({
    items: this.fb.array([]),
  });
  formList: FormArray;
  configSelect: any;
  editableIndex = null;
  newItemIndex;
  editedItem: any = {};

  constructor() {
    super();
  }

  resetLine(index) {
    Object.keys(this.editedItem).forEach((data) => {
      // tslint:disable-next-line:no-string-literal
      this.form.get('items')['controls'][index].controls[data].setValue(null);
    });
    this.updateVariable();
  }

  resetTable() {
    this.form.reset();
    if (this.formList) {
      this.formList.clear();
    }
    this.editableIndex = null;
    this.editedItem = {};
    this.newItemIndex = null;
    this.updateVariable();
  }

  updateVariable() {
    this.formList = this.form.get('items') as FormArray;
    this.resultList = this.formList.value;
    this.resultListChange.emit(this.resultList);
  }

  setDataOfTable(newValue) {
    newValue.forEach((item) => {
      this.addItem(item);
    });
    this.updateVariable();
  }

  setValueOfLine(index, controlName, value) {
    // tslint:disable-next-line:no-string-literal
    this.form.get('items')[
      // tslint:disable-next-line:no-string-literal
      'controls'
    ][index].controls[controlName].setValue(value);
    this.updateVariable();
  }

  selectedValueText(control, configSelect, i) {
    const list = configSelect.request();
    this.formList = this.form.get('items') as FormArray;
    const selected = list
      ? list.find((value) => value.id === this.formList.value[i][control])
      : null;
    return selected ? selected[configSelect.text] : ' - ';
  }

  changeSelected(configSelect, event, index) {
    if (configSelect.onChange) {
      configSelect.onChange(event, index);
    }
  }

  createControls() {
    const controls: any = {};
    if (this.config.columnsHide.length !== 0) {
      this.config.columnsHide.forEach((column) => {
        controls[column] = this.fb.control(null, [Validators.nullValidator]);
      });
    }
    this.config.columns.forEach((column) => {
      controls[column.key] = this.fb.control(null, {
        validators: column.options.validators,
        updateOn: column.options.updateOn ? column.options.updateOn : 'change',
      });
    });
    return controls;
  }

  createItem() {
    return this.fb.group(this.createControls());
  }

  addItem(item?): void {
    if (this.formIsValid()) {
      this.formList = this.form.get('items') as FormArray;
      this.formList.push(this.createItem());
      this.editableIndex = this.formList.length - 1;
      this.newItemIndex = this.formList.length - 1;

      Object.keys(this.createControls()).forEach((key) => {
        this.editedItem[key] = null;
      });

      if (item) {
        Object.keys(this.editedItem).forEach((key) => {
          // tslint:disable-next-line:no-string-literal
          this.formList.controls[this.newItemIndex]['controls'][key].setValue(
            item[key]
          );
          this.editedItem[key] = item[key];
        });
        this.formList.updateValueAndValidity();
        this.form.updateValueAndValidity();
        this.editableIndex = null;
      }

      setTimeout(() => this.requestFocusLastField());
    }
  }

  requestFocusLastField() {
    const formFields = document.querySelectorAll('[formarrayname=items]');
    if (formFields.length) {
      const lastField = formFields.length - 1;
      formFields[lastField].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }

  removeItem(index): void {
    this.editableIndex = null;
    this.formList = this.form.get('items') as FormArray;
    this.formList.removeAt(index);

    this.updateVariable();

    this.newItemIndex = null;
  }

  disableEdit(index) {
    if (this.isLastItemIndex(index) && Number.isInteger(this.newItemIndex)) {
      this.removeItem(index);
    } else {
      Object.keys(this.editedItem).forEach((data) => {
        // tslint:disable-next-line:no-string-literal
        this.form.get('items')[
          // tslint:disable-next-line:no-string-literal
          'controls'
        ][index].controls[data].setValue(this.editedItem[data]);
      });
    }
    this.updateVariable();
    this.editableIndex = null;
  }

  confirmEdit(index) {
    this.editableIndex = null;
    if (index === this.newItemIndex) {
      this.newItemIndex = null;
    }
    this.updateVariable();
  }

  enableEdit(index, item) {
    this.editableIndex = index;
    this.editedItem = this.form.value.items[index];

    this.newItemIndex = null;
  }

  isAnyItemEditing() {
    return this.editableIndex !== null;
  }

  isEditing(index) {
    return this.editableIndex === index;
  }

  isLastItemIndex(index) {
    // tslint:disable-next-line:no-string-literal
    return this.form.get('items')['controls'].length - 1 === index;
  }

  isInvalid(index, formControlName) {
    this.formList = this.form.get('items') as FormArray;
    const control = this.config.columns.find(
      (value) => value.key === formControlName
    );
    const readonly = control ? control.options.readonly : undefined;
    const formControl = this.formList.controls[index].get(formControlName);
    if (!!readonly) {
      return false;
    }
    if ((!formControl.value && formControl.invalid) || formControl.invalid) {
      return true;
    }

    return false;
  }

  formIsValid(): any {
    const formList = this.form.get('items') as FormArray;
    let valid = true;

    if (formList.value.length > 0) {
      valid = formList.value.every((field, i) => {
        const results = [];
        Object.keys(field).forEach((key) => {
          results.push(this.isInvalid(i, key));
        });
        return !results.includes(true);
      });
    }
    return valid;
  }
}

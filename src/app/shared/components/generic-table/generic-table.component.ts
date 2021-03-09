import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {
  @Input() config;
  @Input() tableData;
  @Output() newConfig = new EventEmitter<any>();
  @Input() tabActive = 0;

  changeTab(i, newConfig) {
    if (this.config.search) {
      this.config.search('');
    }
    this.tabActive = i;
    this.newConfig.emit(newConfig);
  }

  typeof(value, type) {
    return typeof(value.text) === type;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import BaseResponse from '../../models/baseResponse.model';
import { PermissionService } from '../../services/permission.service';
import { GenericPageFluent } from '../../fluents/genericPage.fluent';

@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss']
})
export class GenericPageComponent implements OnInit {
  @Input() config: GenericPageFluent;
  @Output() changeTab = new EventEmitter<any>();

  public tableData = [];
  public total = null;
  public page = 1;
  private menuNavigation = null;

  constructor(private permissionService: PermissionService) { }

  ngOnInit() {
    this.menuNavigation = this.config.table.menuNavigation;
    if (this.menuNavigation.length > 0) {
      this.deleteMenu();
      this.updateConfig(this.config.table.menuNavigation[this.config.activeNavigation]);
    } else {
      this.getData(this.page);
    }
  }

  getData(page?) {
    // this.config.requestService({ page: page || this.page, items: this.config.itemsPerPage }).subscribe((response: BaseResponse<any>) => {
    //   this.tableData = response.data.items;
    //   this.total = response.data.total;
    // }, () => {
    //   this.tableData = [];
    //   this.total = 0;
    // });
  }

  updateConfig(navigation) {
    this.config.table = navigation.configTable;
    this.config.table.menuNavigation = this.menuNavigation;
    this.config.requestService = navigation.requestService;
    if (!navigation.options || navigation.options && !navigation.options.blockedRequestWhenStarted) {
      this.getData(this.page);
    } else {
      this.tableData = [];
      this.total = 0;
    }
    this.changeTab.emit(true)
  }

  deleteMenu() {
    const menus = this.menuNavigation;
    for (let i = menus.length - 1; i >= 0; i-- ) {
      if (!!menus[i].options) {
        if (!this.hasPermission(menus[i])) {
          this.menuNavigation.splice(i, 1);
        }
      }
    }
  }

  hasPermission(menu) {
    if (menu.options.permissions && menu.options.permissions.length > 0) {
      return this.permissionService.can(menu.options.permissions);
    }
    return true;
  }
}

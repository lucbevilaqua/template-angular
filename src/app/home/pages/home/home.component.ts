import { Component, OnInit } from '@angular/core';
import Permissions from '../../../shared/enums/permissions.enum';
import { BaseClass } from 'src/app/shared/class/base-class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseClass implements OnInit {
  public Permissions = Permissions;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  showAlert() {
    this.alert.success('Exemplo de mensagem de alerta');
  }

  showDialog() {
    this.dialog.confirm('Titulo', 'Mensagem', () => {
      this.alert.success('Apertou confirma');
    });
  }
}

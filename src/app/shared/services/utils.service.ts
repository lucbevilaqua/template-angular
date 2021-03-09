import { Injectable } from '@angular/core';
import { UrlSerializer, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as CryptoJS from 'crypto-js';
import { selectAuthToken } from 'src/app/auth/auth.selectors';
import { AppState } from 'src/app/reducers';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  authToken: string;

  constructor(
    private store: Store<AppState>,
    private serializer: UrlSerializer,
    private router: Router,
    private alertService: AlertService
  ) {
    store.pipe(select(selectAuthToken)).subscribe(token => {
      this.authToken = token;
    });
  }

  getQueryString(params) {
    const tree = this.router.createUrlTree([''], { queryParams: params });
    return this.serializer.serialize(tree).slice(1);
  }

  encrypt(data: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'zhTwn8fzMLHw97Qj').toString();
  }

  decrypt(key: string) {
    if (key) {
      const resp = CryptoJS.AES.decrypt(key, 'zhTwn8fzMLHw97Qj');
      return JSON.parse(resp.toString(CryptoJS.enc.Utf8));
    }
    return '';
  }

  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }

  imageUrltoBase64(url, callback) {
    const xhr = new XMLHttpRequest();
    let error = false;
    xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          callback(error ? '' : reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.onreadystatechange = () => {
      if (xhr.status === 404) {
        error = true;
        this.alertService.error('Arquivo de foto não encontrado', 5000);
      }
    };
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Authorization',  `Bearer ${this.authToken}`);
    xhr.send();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import BaseResponse from '../models/baseResponse.model';
import Combo from '../models/combo.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  constructor(private http: HttpClient, private utils: UtilsService) { }

  exempleList(filters) {
    return this.http.get<BaseResponse<[Combo]>>(`
      ${ environment.baseApiUrl } exempleList
      ${ this.utils.getQueryString({ ...filters }) }`
    );
  }
}

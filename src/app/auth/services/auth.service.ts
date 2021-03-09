import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import LoginResponse from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`https://portal.luxfacta.com.br/auth/singin`, { user: email, password });
  }
}

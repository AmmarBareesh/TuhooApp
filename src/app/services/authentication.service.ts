import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tuhooConfig } from '../tuhoo.config';
import { TokenService } from './token.service';


const BASEURL = `${tuhooConfig.mainUrl}/`;
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage,
    private plt: Platform,
    private http: HttpClient,
    private tokenService: TokenService) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  loginUser(username, password): Observable<any> {
    return this.http.post(`${BASEURL}login`, {
      username,
      password
    });
  }


  customerRegister(username, email, password, birthday, image): Observable<any> {
    const postData = new FormData();
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //   'enctype': 'multipart/form-data;',
    //   'Accept': 'plain/text',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    //   'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
    //   })
    // };
    postData.append('username', username);
    postData.append('email', email);
    postData.append('password', password);
    postData.append('birthday', birthday);
    postData.append('photo', image);
    return this.http.post(`${BASEURL}customer/signup`, postData);
  }

  forgotPassword(email): Observable<any> {
    return this.http.post(`${BASEURL}password/email`, {
      email
    });
  }

  checkToken() {
    return this.tokenService.getToken().then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }


  loginState() {
    return this.tokenService.setToken(TOKEN_KEY).then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    this.tokenService.deleteToken();
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}

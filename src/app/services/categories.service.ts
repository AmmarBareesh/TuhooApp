import { Injectable } from '@angular/core';
import { tuhooConfig } from '../tuhoo.config';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

const BASEURL = `${tuhooConfig.mainUrl}/`;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient,
    private tokenService: TokenService) { }

  GetCategories(): Observable<any> {
    return this.http.get(`${BASEURL}categories/tree`);
  }

  GetCategoriesById(id): Observable<any> {
    return this.http.get(`${BASEURL}categories/${id}`);
  }

  GetCategorieschildren(cat): Observable<any> {
    return this.http.get(`${BASEURL}categories/${cat}/children`);
  }
}

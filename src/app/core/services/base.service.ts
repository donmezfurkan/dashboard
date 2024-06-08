import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { IResponse } from '../model/IResponse';

@Injectable()
export class BaseService {
  baseUrl = environment?.api;

  constructor(public http: HttpClient) {}

  makeGET(path: string): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + path);
  }

  makePOST(path: string, body: any): Observable<IResponse> {
    return this.http.post<IResponse>(this.baseUrl + path, body);
  }

  makeUpload(path: string, formData: any): Observable<IResponse> {
    return this.http.post<IResponse>(this.baseUrl + path, formData);
  }

  makeDELETE(path: string): Observable<IResponse> {
    return this.http.delete<IResponse>(this.baseUrl + path);
  }

  makePUT(path: string, body: any): Observable<IResponse> {
    return this.http.put<IResponse>(this.baseUrl + path, body);
  }

  makePUTedit(path: string, body: any): Observable<IResponse> {
    return this.http.put<IResponse>(this.baseUrl + path, body);
  }
  
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  serverUrl = 'http://192.168.0.223:3000/';
  constructor(private httpClient: HttpClient) { }


  loginUser(body: any) {
    return this.httpClient.post(this.serverUrl + 'generate', body);
  }

  verifyUser(body: any) {
    return this.httpClient.post(this.serverUrl + 'verify', body);
  }
}

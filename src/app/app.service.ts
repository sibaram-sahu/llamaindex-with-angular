import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient) { }

  searchQuery(query: string): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const data = {
      query
    }
    return this._http.post('http://localhost:8002', data, { headers });
  }
}

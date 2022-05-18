import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Designation } from 'Models/Designation';
import { Organisation } from 'Models/Organisation';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly apiurl = "https://localhost:7275/api/";
  constructor(private http:HttpClient) { }

  addOrganisation(data:any): Observable<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.apiurl + 'Organisation/Create', data)
  }
  getAllOrganisation():Observable<any>{
    return this.http.get<Organisation>(this.apiurl + 'Organisation/GetAll')
  }
  addAwardType(data:any): Observable<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.apiurl + 'AwardType/Create', data)
  }
  getAllAwardType():Observable<any>{
    return this.http.get<Organisation>(this.apiurl + 'AwardType/GetAll')
  }
  addDesignation(data:any): Observable<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.apiurl + 'Designation/Create', data)
  }
  getAllDesignation():Observable<any>{
    return this.http.get<Designation>(this.apiurl + 'Designation/GetAll')
  }
}

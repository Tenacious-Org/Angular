import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AwardType } from 'Models/AwardType';
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
  editAwardType(id:number,data:any): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<any>(this.apiurl + `AwardType/Update?id=${id}`, data,{headers:headers})
  }
  getAllAwardType():Observable<any>{
    return this.http.get<AwardType>(this.apiurl + 'AwardType/GetAll')
  }
  getAllDesignation():Observable<any>{
    return this.http.get<Designation>(this.apiurl + 'Designation/GetAll')
  }
  addDesignation(data:any): Observable<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.apiurl + 'Designation/Create', data)
  }
}

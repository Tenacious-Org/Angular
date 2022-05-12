import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organisation } from 'Models/Organisation';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private http: HttpClient) { }
  apiurl = "https://localhost:7275/api/Organisation/"

  AddOrganisation(data:any): Observable<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.apiurl + 'Create', data)
  }
  

}

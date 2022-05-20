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
//common services
//GetAll method
  getAll(endpoint:string):Observable<any>
  {
    return this.http.get<any>(this.apiurl + endpoint +'/GetAll')
  }

//Get By ID method
  getById(endpoint:string,id:any)
  {
    return this.http.get<any>(this.apiurl + endpoint+`/GetById?id=${id}`)
  }

//create method
  add(endpoint:any,data:any): Observable<any>
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.apiurl + endpoint+'/Create', data)
  }
//Update method
  edit(endpoint:any,data:any): Observable<any>
  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<any>(this.apiurl + endpoint+`/Update`, data,{headers})
  }
 
//Get Department By Organisation ID
  getDepartmentByOrganisation(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Department/GetDepartmentsByOrganisationId?id=${id}`)
  }

//Get Designation By Department ID
  getDesignationByDepartment(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Designation/GetDesignationsByDepartmentId?id=${id}`)
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
  getById(endpoint:any,id:any)
  {
    return this.http.get<any>(this.apiurl + endpoint+`/GetById?id=${id}`)
  }

//create method
  add(endpoint:any,data:any):Observable<any>
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.apiurl + endpoint+'/Create', data)
  }

//Update method
  edit(endpoint:any,data:any):Observable<any>
  {
    return this.http.put<any>(this.apiurl + endpoint +`/Update`, data)
  }

//Disable method
disable(endpoint:any,id:any):Observable<string>{
  return this.http.put<any>(this.apiurl+endpoint+`/Disable?id=${id}`,Object)
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

//Get Employee By Department ID
  getEmployeeByDepartment(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Employee/GetEmployeeByDepartment?id=${id}`)
  }

  //Get ReportingPerson By Department ID
  getReportingPersonByDepartment(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Employee/GetReportingPersonByDepartment?id=${id}`)
  }

  //Get HR By Department ID
  getHrByDepartment(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Employee/GetHrByDepartment?id=${id}`)
  }

//Get Requested Award List
  getRequestedAwardList(id:number):Observable<any>
  {
    return this.http.get<any>(this.apiurl +`Award/GetRequestedAwardsList?id=${id}`)
  }
  getEmployeeByRequester(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl+`Employee/GetEmployeeByRequesterId?id=${id}`)

  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly apiurl = "https://localhost:7275/";
  constructor(private http:HttpClient) { }

  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AuthenticationService.GetData("token")}`
  })
//common services
//GetAll method
  getAll(endpoint:string):Observable<any>
  {
    return this.http.get<any>(this.apiurl + endpoint +'/GetAll',{ headers: this.headers })
  }

//Get By ID method
  getById(endpoint:any,id:any)
  {
    return this.http.get<any>(this.apiurl + endpoint+`/GetById?id=${id}`,{ headers: this.headers })
  }

//create method
  add(endpoint:any,data:any):Observable<any>
  {
    
    return this.http.post<any>(this.apiurl + endpoint+'/Create', data,{ headers: this.headers })
  }

//Update method
  edit(endpoint:any,data:any):Observable<any>
  {
    return this.http.put<any>(this.apiurl + endpoint +`/Update`, data,{ headers: this.headers })
  }

//Disable method
disable(endpoint:any,id:any):Observable<string>{
  return this.http.put<any>(this.apiurl+endpoint+`/Disable?id=${id}`,Object,{ headers: this.headers })
}

//Get Department By Organisation ID
  getDepartmentByOrganisation(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Department/GetDepartmentsByOrganisationId?id=${id}`,{ headers: this.headers })
  }

//Get Designation By Department ID
  getDesignationByDepartment(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Designation/GetDesignationsByDepartmentId?id=${id}`,{ headers: this.headers })
  }

//Get Employee By Department ID
  getEmployeeByDepartment(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Employee/GetEmployeeByDepartment?id=${id}`,{ headers: this.headers })
  }

  //Get ReportingPerson By Department ID
  getReportingPersonByDepartment(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Employee/GetReportingPersonByDepartment?id=${id}`,{ headers: this.headers })
  }

  //Get HR By Department ID
  getHrByDepartment(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Employee/GetHrByDepartment?id=${id}`,{ headers: this.headers })
  }

//Get Requested Award List
  getRequestedAwardList(id:number):Observable<any>
  {
    return this.http.get<any>(this.apiurl +`Award/GetRequestedAwardsList?id=${id}`,{ headers: this.headers })
  }
  getEmployeeByRequester(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl+`Employee/GetEmployeeByRequesterId?id=${id}`,{ headers: this.headers })

  }

  //Get All Winners
  getallwinner():Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllWinners`)
  }

}

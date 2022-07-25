import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly apiurl = "http://172.24.209.186/AMS-api/";
  constructor(private http:HttpClient) { }

  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AuthenticationService.GetData("token")}`
  })
  //common services
  //GetAll method
  GetAll(endpoint: string): Observable<any> {
    return this.http.get<any>(this.apiurl + endpoint + '/GetAll', { headers: this.headers })
  }

  //Get By ID method
  GetById(endpoint: any, id: any) {
    return this.http.get<any>(this.apiurl + endpoint + `/GetById?id=${id}`, { headers: this.headers })
  }

  //create method
  Add(endpoint: any, data: any): Observable<any> {
    return this.http.post<any>(this.apiurl + endpoint + '/Create', data, { headers: this.headers })
  }

  //Update method
  Edit(endpoint: any, data: any): Observable<any> {
    return this.http.put<any>(this.apiurl + endpoint + `/Update`, data, { headers: this.headers })
  }

  //Disable method
  Disable(endpoint: any, id: any): Observable<string> {
    return this.http.put<any>(this.apiurl + endpoint + `/Disable?id=${id}`, Object, { headers: this.headers })
  }

  //Get Department By Organisation ID
  GetDepartmentByOrganisationId(id: any): Observable<any> {
    return this.http.get<any>(this.apiurl + `Department/GetDepartmentsByOrganisationId?id=${id}`, { headers: this.headers })
  } 

  //Get Designation By Department ID
  GetDesignationByDepartmentId(id: any): Observable<any> {
    return this.http.get<any>(this.apiurl + `Designation/GetDesignationsByDepartmentId?id=${id}`, { headers: this.headers })
  }

  //Get Employee By Department ID
  GetEmployeeByDepartmentId(departmentId: any): Observable<any> {
    return this.http.get<any>(this.apiurl + `Employee/GetEmployeeByDepartment?departmentId=${departmentId}`, { headers: this.headers })
  }

  //Get ReportingPerson By Department ID
  GetReportingPersonByDepartmentId(departmentId: any): Observable<any> {
    return this.http.get<any>(this.apiurl + `Employee/GetReportingPersonByDepartment?departmentId=${departmentId}`, { headers: this.headers })
  }

  //Get HR By Department ID
  GetHrByDepartmentId(departmentId: any): Observable<any> {
    return this.http.get<any>(this.apiurl + `Employee/GetHrByDepartment?departmentId=${departmentId}`, { headers: this.headers })
  }
  
 //Get employee by VP designation
 GetEmployeeByVpDesignation(): Observable<any> {
  return this.http.get<any>(this.apiurl + `Employee/GetEmployeeByVpDesignation`, { headers: this.headers })
}
  //Get Requested Award List
  GetRequestedAwardList(id: number): Observable<any> {
    return this.http.get<any>(this.apiurl + `Award/GetRequestedAwardsList?id=${id}`, { headers: this.headers })
  }
  GetEmployeeByRequester(requesterId: any): Observable<any> {
    return this.http.get<any>(this.apiurl + `Employee/GetEmployeeByRequesterId?requesterId=${requesterId}`, { headers: this.headers })

  }

  //Get All Winners
  GetAllAwardee(): Observable<any> {
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllAwardees`)
  }

  //Filtering Dashboard
  GetAllDetailsByDashboardFilters(organisationId: number, departmentId: number, awardId: number, start: any, end: any) {
    return this.http.get<any>(this.apiurl + `Dashboard/GetDashboardDetailsByFilters?organisationId=${organisationId}&departmentId=${departmentId}&awardId=${awardId}&start=${start}&end=${end}`, { headers: this.headers })
  }

  //Forgot password
  ForgotPassword(data:any):Observable<any>{
    return this.http.post<any>(this.apiurl + 'Employee/ForgotPassword', data, { headers: this.headers })
  }

}

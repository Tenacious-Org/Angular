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
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllAwardees`)
  }

  //get All Winners Organisation Wise
  getallwinOrgwise(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllOrgWise?id=${id}`,{ headers: this.headers })
  }

  //get All Winners Award Wise
  getallAwardwise(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllAwardWise?id=${id}`,{ headers: this.headers })
  }

  //get all winners from organisation and award wise
  getallorganddept(orgid:number, deptid:number){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllOrgandDepWise?orgid=${orgid}&depid=${deptid}`,{ headers: this.headers })
  }

  //get all winners from organisation and award wise
  getallorgandawd(orgid:number, awdid:number){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllOrgandAwardWise?orgid=${orgid}&awdid=${awdid}`,{ headers: this.headers })
  }

  //get all winners from organisation and award wise
  getallorgdeptandawd(orgid:number, deptid:number, awdid: number){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllOrgDepandAwardWise?orgid=${orgid}&depid=${deptid}&awdid=${awdid}`,{ headers: this.headers })
  }

  //get all winners from organisation, Department and From date wise
  getallorgdeptandfdate(orgid:number, deptid:number, fdate: Date){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllFilteredOrgDepandFromDateWise?orgid=${orgid}&deptid=${deptid}&start=${fdate}`,{ headers: this.headers })
  }

  //get all winners from organisation, Award and From date wise
  getallorgawdandfdate(orgid:number, awdid:number, fdate: Date){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllFilteredOrgAwdandFromDateWise?orgid=${orgid}&awdid=${awdid}&start=${fdate}`,{ headers: this.headers })
  }

  //get all winners from organisation, Department and To date wise
  getallorgdeptandtdate(orgid:number, deptid:number, tdate: Date){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllFilteredOrgDepandToDateWise?orgid=${orgid}&deptid=${deptid}&end=${tdate}`,{ headers: this.headers })
  }

  //get all winners from organisation, Award and To date wise
  getallorgawdandtdate(orgid:number, awdid:number, tdate: Date){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllFilteredOrgAwdandToDateWise?orgid=${orgid}&awdid=${awdid}&end=${tdate}`,{ headers: this.headers })
  }

  //get by all Filters From Date Range
  getAllFilterdFromDateWise(fdate:Date){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllFilteredFromDateWise?start=${fdate}`,{ headers: this.headers })
  }

  //get by all Filters Organisation and From Date Range
  getAllFilterdOrgandFromDateWise(orgid: number, fdate:Date){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllFilteredOrganisationandFromDateWise?orgid=${orgid}&start=${fdate}`,{ headers: this.headers })
  }

  //get by all Filters To Date Range
  getAllFilterdToDateWise(tdate:Date){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllFilteredToDateWise?end=${tdate}`,{ headers: this.headers })
  }

  //get by all Filters Organisation and From Date Range
  getAllFilterdOrgandToDateWise(orgid: number, tdate:Date){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllFilteredOrganisationandFromDateWise?orgid=${orgid}&end=${tdate}`,{ headers: this.headers })
  }

  //get by all Filters Date Range
  getAllFiltersDateWise(orgid: number, deptid: number, awdid: number, fdate:Date, tdate:Date){
    return this.http.get<any>(this.apiurl + `Dashboard/GetAllFilteredDateWise?orgid=${orgid}&deptid=${deptid}&awdid=${awdid}&start=${fdate}&end=${tdate}`,{ headers: this.headers })
  }

}

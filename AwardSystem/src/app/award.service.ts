import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwardService {
  readonly apiurl = "https://localhost:7275/api/Award/";
  constructor(private http:HttpClient) { }

  // Get Awards --> pageId 0=Homepage , 1=mywards, 2= requesterList , 3= approverList, 4=HR List .
  // getAwards(pageId:any,employeeId:any):Observable<any>
  // {
  //   return this.http.get<any>(this.apiurl+`GetAwards?pageId=${pageId}&employeeId=${employeeId}`)
  // }


  // Get Award By id
  getAwardById(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl+`GetAwardById?id=${id}`)
  }

  //Approval of the request
  approval(data:any,id:any): Observable<any>
  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<any>(this.apiurl+`Approval?id=${id}`,data,{headers});
  }


  // Add comments - Awardservices
  addComment(data:any): Observable<any>
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.apiurl +'AddComment', data)
  }
  addRequest(data:any,id:any): Observable<any>
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.apiurl +`RaiseRequest?id=${id}`, data)
  }

  getComments(awardId:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl+`GetComments?awardId=${awardId}`)
  }

  getAwardsList(pageId:any,employeeId:any):Observable<any>{
    return this.http.get<any>(this.apiurl+`GetAwardsList?pageId=${pageId}&employeeId=${employeeId}`)
  }

}

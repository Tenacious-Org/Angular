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
  getAwards(pageId:any,employeeId:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl+`GetAwards?pageId=${pageId}&employeeId=${employeeId}`)
  }


  // Get Award By id
  getAwardById(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl+`GetAwardById?id=${id}`)
  }

  //Approve the request
  approve(data:any): Observable<any>
  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<any>(this.apiurl+`Approve`,data,{headers});
  }

  //Reject the Request
  reject(data:any): Observable<any>
  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<any>(this.apiurl+`Reject`,data,{headers});
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AwardService {
  readonly apiurl = "http://172.24.209.186/AMS-api/Award/";
  constructor(private http:HttpClient) { }
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AuthenticationService.GetData("token")}`
  })

  // Get Awards --> pageId 0=Homepage , 1=myawards, 2= requesterList , 3= approverList, 4=HR List .
  GetAwardsList(pageId:any):Observable<any>{
    return this.http.get<any>(this.apiurl+`GetAwardsList?pageId=${pageId}`,{ headers: this.headers })
  }

  GetAwardsByStatusId(id:any):Observable<any>{
    return this.http.get<any>(this.apiurl+`GetAwardsByStatusId?statusId=${id}`,{ headers: this.headers })
  }

  // Get Award By id
  GetAwardById(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl+`GetAwardById?id=${id}`,{ headers: this.headers })
  }

  //Approval of the request
  Approval(data:any): Observable<any>
  {
    return this.http.put<any>(this.apiurl+`Approval`,data,{ headers: this.headers });
  }

  // Add comments - Awardservices
  AddComment(data:any): Observable<any>
  {
    return this.http.post<any>(this.apiurl +'AddComment', data,{ headers: this.headers })
  }
  AddRequest(data:any): Observable<any>
  {
    return this.http.post<any>(this.apiurl +`RaiseRequest`, data,{ headers: this.headers })
  }

  GetComments(awardId:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl+`GetComments?awardId=${awardId}`,{ headers: this.headers })
  }

}

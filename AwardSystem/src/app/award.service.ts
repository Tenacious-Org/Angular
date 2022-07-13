import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AwardService {
  readonly apiurl = "https://localhost:7275/Award/";
  constructor(private http:HttpClient) { }
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AuthenticationService.GetData("token")}`
  })

  // Get Awards --> pageId 0=Homepage , 1=myawards, 2= requesterList , 3= approverList, 4=HR List .
  getAwardsList(pageId:any,employeeId:any):Observable<any>{
    return this.http.get<any>(this.apiurl+`GetAwardsList?pageId=${pageId}&employeeId=${employeeId}`,{ headers: this.headers })
  }

  // Get Award By id
  getAwardById(id:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl+`GetAwardById?id=${id}`,{ headers: this.headers })
  }

  //Approval of the request
  approval(data:any,id:any): Observable<any>
  {
    return this.http.put<any>(this.apiurl+`Approval?id=${id}`,data,{ headers: this.headers });
  }

  // Add comments - Awardservices
  addComment(data:any): Observable<any>
  {
    return this.http.post<any>(this.apiurl +'AddComment', data,{ headers: this.headers })
  }
  addRequest(data:any,id:any): Observable<any>
  {
    return this.http.post<any>(this.apiurl +`RaiseRequest?id=${id}`, data,{ headers: this.headers })
  }

  getComments(awardId:any):Observable<any>
  {
    return this.http.get<any>(this.apiurl+`GetComments?awardId=${awardId}`,{ headers: this.headers })
  }

}

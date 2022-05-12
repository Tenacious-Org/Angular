import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from 'Models/Department';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) { }
  apiurl = "https://localhost:7275/api/Department/"

  getAllDepartment(organisationId:number):Observable<any>{
     return this.http.get<Department>(this.apiurl + 'GetAll')
   }

  AddDepartment(data:any): Observable<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.apiurl + 'Create',data)
  }

}

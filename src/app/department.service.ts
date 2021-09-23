import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly apiEndPont = "http://localhost:41224/api/department";
  constructor(private http: HttpClient) { }


  Get(id: number) {

  }

  GetAll() {
    return this.http.get(this.apiEndPont);
  }

  Create(department: any) {
    return this.http.post(this.apiEndPont, department)

  }

  delete(id: number) {

  }

  updadet(id: number, department: any) {

  }
}

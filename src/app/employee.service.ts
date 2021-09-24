import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly endpointUrl = "http://localhost:41224/Employee"

  constructor(private httpclient: HttpClient) { }

  Getall() {
    return this.httpclient.get(this.endpointUrl)
  }
  update(id: number, employee: any) {
    employee.Id = id;
    return this.httpclient.put(this.endpointUrl, employee);
  }

  Create(employee: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpclient.post(this.endpointUrl, employee, httpOptions);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpclient: HttpClient) { }
  private readonly endpointUrl = "http://localhost:41224/Employee"

  Getall() {
    return this.httpclient.get(this.endpointUrl)
  }
}

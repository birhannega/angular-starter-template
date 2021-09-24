import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from './department.service';
import { EmployeeService } from './employee.service';
import { Department } from './Models/Department';
import { CreateAddressDto, EmployeeDto } from './Models/EmployeeDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Demo';
  departments: any[] | undefined;
  employees: any[] | undefined;
  CreateMode: boolean = true;
  employeeId: number = 0;

  departmentForm: FormGroup = this.formBuilder.group({
    departmentName: [null, [Validators.required, Validators.minLength(4)]]
  });


  employeeForm: FormGroup = this.formBuilder.group({
    FirstName: [],
    LastName: [],
    Gender: [],
    BirthDate: [],
    DepartmentId: []
  });

  constructor(
    private deptService: DepartmentService,
    private empService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.getDepartments();
    this.getEmployees();
  }
  // Setting up getter for employee fields
  get DepartmentId() {
    return this.employeeForm.get('DepartmentId');
  }
  get Gender() {
    return this.employeeForm.get('Gender');
  }
  get BirthDate() {
    return this.employeeForm.get('BirthDate');
  }
  get FirstName() {
    return this.employeeForm.get('FirstName');
  }
  get LastName() {
    return this.employeeForm.get('LastName');
  }

  get departmentName() {
    return this.departmentForm?.get("departmentName");
  }
  // Setting up getter for department name field

  getEmployees() {
    this.empService.Getall().subscribe((result: any) => {
      this.employees = result.data;
      console.log("employee", this.employees)
    })
  }
  getDepartments() {
    this.deptService.GetAll()
      .subscribe((depts: any) => {
        this.departments = depts.data;
        console.log("departments", this.departments)
      });
  }

  SaveDepartment() {
    const formData = this.departmentForm.getRawValue();
    console.log(formData);
    var dept = new Department();
    dept.DepartmentName = formData.departmentName;
    this.deptService.Create(dept).subscribe(result => {
      this.getDepartments();
    });

  }

  printTable() {
    console.log("print clicked")
    window.print();
  }

  UpdateEmployee() {
    var updatedEmployee: EmployeeDto = new EmployeeDto();
    const UpdatedformData = this.employeeForm.getRawValue();

    updatedEmployee.FirstName = UpdatedformData.FirstName;
    updatedEmployee.LastName = UpdatedformData.LastName;
    updatedEmployee.Gender = UpdatedformData.Gender;
    updatedEmployee.BirthDate = UpdatedformData.BirthDate;
    updatedEmployee.DepartmentId = UpdatedformData.DepartmentId;

    console.log("target id", this.employeeId)
    this.empService.update(this.employeeId, updatedEmployee).subscribe((response: any) => {
      console.log("Update employee response", response);
    });

  }

  PopulateDatatoForm(employee: any) {
    this.CreateMode = false;
    this.employeeId = employee.id;
    console.log("to be updated", employee)
    this.employeeForm.get("FirstName")?.setValue(employee.firstName);
    this.employeeForm.get("LastName")?.setValue(employee.lastName);
    this.employeeForm.get("Gender")?.setValue(employee.gender);
    this.employeeForm.get("DepartmentId")?.setValue(employee.departmentId);
    this.employeeForm.get("DepartmentId")?.updateValueAndValidity();
    this.employeeForm.get("FirstName")?.setValue(employee.firstName);



  }

  SaveEmployee() {

    const address: CreateAddressDto = new CreateAddressDto();
    address.Mobile = 635524325 + Math.random();
    address.Region = "eth-" + Date.now().toString();
    address.Woreda = "woreda" + Math.random();
    address.Telephone = "011" + Math.random();
    address.Zone = "zone" + Math.random();


    var newEmployee: EmployeeDto = new EmployeeDto();
    const formData = this.employeeForm.getRawValue();

    newEmployee.FirstName = formData.FirstName;
    newEmployee.LastName = formData.LastName;
    newEmployee.Gender = formData.Gender;
    newEmployee.BirthDate = formData.BirthDate;
    newEmployee.DepartmentId = formData.DepartmentId;
    // newEmployee.EmployeeAddress = address;

    this.empService.Create(newEmployee).subscribe((response: any) => {
      console.log("create employee response", response);
    });

  }

}

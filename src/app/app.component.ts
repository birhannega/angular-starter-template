import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from './department.service';
import { EmployeeService } from './employee.service';
import { Department } from './Models/Department';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Demo';
  departments: any[] | undefined;
  employees: any[] | undefined;

  departmentForm: FormGroup = this.formBuilder.group({
    departmentName: [null, [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    private deptService: DepartmentService,
    private empService: EmployeeService,
    private formBuilder: FormBuilder
  ) {

    this.deptService.GetAll()
      .subscribe((depts: any) => {
        this.departments = depts.data;
      });

    this.empService.Getall().subscribe((result: any) => {
      this.employees = result.data;
    })

  }

  get departmentName() {
    return this.departmentForm?.get("departmentName");
  }

  SaveDepartment() {
    const formData = this.departmentForm.getRawValue();
    console.log(formData);
    var dept = new Department();
    dept.DepartmentName = formData.departmentName;
    this.deptService.Create(dept).subscribe(result => {
      console.log("create response", result);
    })

  }

}

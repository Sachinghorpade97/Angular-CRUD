import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashbard',
  templateUrl: './employee-dashbard.component.html',
  styleUrls: ['./employee-dashbard.component.css']
})
export class EmployeeDashbardComponent implements OnInit {
  
  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, 
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      dateOfBirth: [''],
      avatar: [''],
      country: ['']

    })
    this.getAllEmployee();
  }
  url="C:/Users/SachinGhorpade/Desktop/img";
  onselectFile(e:any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }

  }

  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.employeeModelObj.avatar = this.formValue.value.avatar;
    this.employeeModelObj.country = this.formValue.value.country;

  

    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Sucssesfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something wrong")
    })
  }
  getAllEmployee(){
    this.api.getEmploye()
    .subscribe(res=>{
       this.employeeData = res;
    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmploye(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['dateOfBirth'].setValue(row.dateOfBirth)
    this.formValue.controls['avatar'].setValue(row.avatar)
    this.formValue.controls['country'].setValue(row.country)
  }
  putEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.employeeModelObj.avatar = this.formValue.value.avatar;
    this.employeeModelObj.country = this.formValue.value.country;

    this.api.putEmploye(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something wrong")
    })
  }

}

import { Component,Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent  implements OnInit{
  empForm: FormGroup;
  education: String[] = [
    "Bachelor Degree",
    "Master Degree",
    "Diploma"
  ];

  constructor(
    private _fb: FormBuilder,
    private _empservice: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any,
  ){
    this.empForm = this._fb.group({
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      gender: "",
      education: "",
      company: "",
      experience: "",
      package: "",
  });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empservice
        .updateEmployee(this.data.id,this.empForm.value)
        .subscribe({
          next:(val:any)=>{
            alert('Employee detail Updated!');
            this._dialogRef.close(true);
          },
          error:(err: any) =>{
            console.error(err);
          },
        });
      }else{
      this._empservice.addEmployee(this.empForm.value).subscribe({
      next: (val: any)=>{
       alert('Employee added successfully');
       this._dialogRef.close(true);
      },
      error:(err:any)=>{
        console.error(err);
      },
    });
    }
  }
}
}
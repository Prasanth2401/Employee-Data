import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar:MatSnackBar) { }
  openSnackBar(message:string,action:string='ok'){
    this._snackBar.open(message,action,{
      duration:1000,
      verticalPosition:'top',
    });
  }
}

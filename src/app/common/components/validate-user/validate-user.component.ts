import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.scss']
})
export class ValidateUserComponent implements OnInit {
  LoginModel: any ={
    username: localStorage.getItem('username'),
    password: ''
  };
  constructor(private authService: AuthService,
    public dialogRef: MatDialogRef<ValidateUserComponent>,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  ValidateUser() {

    this.authService.validateUserCredentials(this.LoginModel).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => {
        this.toastrService.error('verification failed. please enter valid credentials', 'Error');
        this.dialogRef.close(false);
      }
    });
  }

}

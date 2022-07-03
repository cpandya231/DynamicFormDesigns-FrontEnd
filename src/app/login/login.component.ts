import { Component, OnInit } from '@angular/core';
import { LoginModel } from './login-model';
import { AuthService } from 'src/app/services/auth.service';
import {
  Router
} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = { username: '', password: '' };
  constructor(private authService: AuthService, private router: Router) { }

  submitted = false;
  errorOccured = false;
  token = {};
  showPassword = false;
  ngOnInit(): void {
  }



  onSubmit() {
    this.authService.login(this.loginModel).subscribe({
      next: this.navigateOnSuccess.bind(this), error: this.handleError.bind(this)
    });

  }

  navigateOnSuccess() {

    this.router.navigate(['/welcome']);
  }

  handleError(err: any) {
    console.error(`Error occured while login ${JSON.stringify(err)}`);
    this.errorOccured = true;
  }

  togglePasswordVisibility(e: any) {
    this.showPassword = e.target.checked;

  }

}

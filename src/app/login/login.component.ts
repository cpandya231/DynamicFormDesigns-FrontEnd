import { Component, OnInit } from '@angular/core';
import { LoginModel } from './login-model';
import { UsersService } from 'src/app/services/users.service';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = { username: '', password: '' };
  constructor(private usersService: UsersService, private router: Router) { }

  submitted = false;
  errorOccured = false;
  token = {};
  ngOnInit(): void {
  }



  onSubmit() {


    this.usersService.getToken(this.loginModel).subscribe(token => {

      this.token = JSON.stringify(token);
      this.router.navigate(['/welcome', { state: token["access_token"] },]);
    }, err => {
      console.error(`Error occured while login`);
      this.errorOccured = true;
    });

  }

}

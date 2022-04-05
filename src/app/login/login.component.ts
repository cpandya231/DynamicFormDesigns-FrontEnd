import { Component, OnInit } from '@angular/core';
import { LoginModel } from './login-model';
import { UsersService } from 'src/services/users.service';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel = new LoginModel("", "");
  constructor(private usersService: UsersService, private router: Router) { }

  submitted = false;
  errorOccured = false;
  token = {};
  ngOnInit(): void {
  }



  onSubmit() {

    console.log(`Inside submit ${JSON.stringify(this.loginModel)}`);
    this.usersService.getToken(this.loginModel).subscribe(token => {
      console.log(`Got response ${JSON.stringify(token)}`);
      this.token = JSON.stringify(token);
      this.router.navigate(['/welcome', { state: token["access_token"] },]);
    }, err => {
      console.log(`Error occured while login`);
      this.errorOccured = true;
    });

  }

}

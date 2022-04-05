import { Component, OnInit } from '@angular/core';
import { LoginModel } from './login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel = new LoginModel("", "");
  constructor() { }

  submitted = false;

  ngOnInit(): void {
  }



  onSubmit() {
    console.log(`Inside submit ${JSON.stringify(this.loginModel)}`);

  }

}

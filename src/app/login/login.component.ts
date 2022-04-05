import { Component, OnInit } from '@angular/core';
import { LoginModel } from './login-model';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel = new LoginModel("", "");
  constructor(private usersService: UsersService) { }

  submitted = false;

  ngOnInit(): void {
  }



  onSubmit() {
    console.log(`Inside submit ${JSON.stringify(this.loginModel)}`);
    this.usersService.getToken(this.loginModel).subscribe(token => {
      console.log(`Got response ${JSON.stringify(token)}`);
    });

  }

}

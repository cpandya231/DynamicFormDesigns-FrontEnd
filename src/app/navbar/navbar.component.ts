import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { INavBarItem } from './navbar-item-model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: any = "";


  @Input() showNavbarItems!: boolean;
  constructor(private authService: AuthService, private userService: UsersService, private router: Router) {

  }

  ngOnInit(): void {


    this.userService.getUserByUsername(localStorage.getItem("username")).subscribe(data => {
      this.username = data.first_name;
    })

  }

  invalidateSession() {
    this.authService.invalidateSession();
    this.router.navigate(['/']);
  }
}

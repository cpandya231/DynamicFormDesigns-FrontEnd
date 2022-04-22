import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { INavBarItem } from './navbar-item-model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {



  @Input() navBarItems!: INavBarItem[];
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  invalidateSession() {
    this.authService.invalidateSession();
    this.router.navigate(['/']);
  }
}

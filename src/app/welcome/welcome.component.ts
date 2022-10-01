import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private authSevice: AuthService,
    private router: Router) { }
  token: any = "";
  email: any = "";
  IsAdminUser = false;
  username = localStorage.getItem('username');

  ngOnInit(): void {
    this.IsAdminUser = this.authSevice.isAdmin();
  }


  OpenELogBook(): any {
    if (this.IsAdminUser) {
      this.router.navigate(['/formsDashboard']);
    } else {
      this.router.navigate(['/userFormsDashboard']);
    }
  }

  OpenSmartJobs(): void {

  }

  OpenEUAM(): void {

  }

  OpenEWatchTower(): void {
    this.router.navigate(['/watchTower']);
  }

}

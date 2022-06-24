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

  ngOnInit(): void {

  }


  navigate(): any {
    let isAdmin = this.authSevice.isAdmin();
    if (isAdmin) {
      this.router.navigate(['/usersParent/users']);
    } else {
      this.router.navigate(['/formsDashboard']);
    }
  }

}

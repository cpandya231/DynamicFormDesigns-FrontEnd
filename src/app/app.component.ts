import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { INavBarItem } from './navbar/navbar-item-model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flux-Intelligent';
  showNavbar = true;
  showNavbarItems = false;
  isAdmin = false;
  username: any;
  isDataLoaded = false;


  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {



    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {

        let url = (<NavigationEnd>event).url;
        if (url.includes("/welcome")) {
          this.showNavbarItems = false;
          this.showNavbar = true;
        } else if (url == "/") {
          this.showNavbarItems = false;
          this.showNavbar = false;
        } else {

          this.showNavbarItems = true;
          this.showNavbar = true;
        }

        this.isAdmin = this.authService.isAdmin();
        this.username = localStorage.getItem('username');
        this.isDataLoaded = true;
      }


    });
  }
}

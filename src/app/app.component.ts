import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { INavBarItem } from './navbar/navbar-item-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SmartFac';
  showNavbar = true;


  navBarItems: INavBarItem[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {


    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {

        let url = (<NavigationEnd>event).url;
        if (url.includes("/welcome")) {
          this.navBarItems = [];
          this.showNavbar = true;
        } else if (url == "/") {

          this.showNavbar = false;
        } else {

          this.navBarItems = [
            {
              name: "Home",
              url: "welcome",
            },
            {
              name: 'Forms',
              url: 'formsDashboard'
            },
            {
              name: "User Management",
              url: "usersParent",

              children: [
                {
                  name: "Users",
                  url: "users",
                },
                {
                  name: "Roles",
                  url: "roles",
                }
              ]
            },
            {
              name: 'Departments',
              url: 'departments'
            },
          ];
          this.showNavbar = true;
        }
      }
    });
  }
}

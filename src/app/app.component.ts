import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SmartFac';
  showNavbar = true;
  showNavbarItems = true;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {


    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log('App component')
        console.log((<NavigationEnd>event).url);
        let url = (<NavigationEnd>event).url;
        if (url == "/welcome") {
          this.showNavbarItems = false;
          this.showNavbar = true;
        } else if (url == "/") {
          this.showNavbarItems = false;
          this.showNavbar = false;
        } else {
          this.showNavbarItems = true;
          this.showNavbar = true;
        }
        console.log(`showNavbarItems ${this.showNavbarItems}`)
      }
    });
  }
}

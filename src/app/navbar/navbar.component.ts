import { Component, Input, OnInit } from '@angular/core';
import { INavBarItem } from './navbar-item-model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  @Input('shownavbaritems') shownavbaritems: boolean | undefined;
  navBarItems!: INavBarItem[];
  constructor() {

  }

  ngOnInit(): void {
    console.log(`showNavbarItems in nav ${this.shownavbaritems}`)

    if (this.shownavbaritems) {
      this.navBarItems = [
        {
          name: "Home",
          url: "welcome",

          children: []
        },
        {
          name: "User Management",
          url: "usersParent",

          children: [
            {
              name: "Users",
              url: "users",

              children: []
            },
            {
              name: "Roles",
              url: "roles",

              children: []
            }
          ]
        },
      ];
    } else {
      this.navBarItems = []
    }


  }

}

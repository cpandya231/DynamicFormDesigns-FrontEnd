import { Component, Input, OnInit } from '@angular/core';
import { NavBarItem } from './navbar-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input('activelink') activelink = '';

  @Input() navBarItems!: NavBarItem[];
  constructor() {


  }


  ngOnInit(): void {
    console.log(`Inside navbar activeLink ${this.activelink}`);
    if (this.navBarItems == null) {
      this.navBarItems = [
        {
          name: "Home",
          url: "welcome",
          isActive: false
        },
        {
          name: "Users",
          url: "users",
          isActive: false
        },
        {
          name: "Apps",
          url: "welcome",
          isActive: false
        }
      ];
    }

    this.navBarItems.filter(item => item.url == this.activelink).forEach(item => item.isActive = true);
  }

}

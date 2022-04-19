import { Component, Input, OnInit } from '@angular/core';
import { INavBarItem } from './navbar-item-model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {



  @Input() navBarItems!: INavBarItem[];
  constructor() {

  }

  ngOnInit(): void {

  }
}

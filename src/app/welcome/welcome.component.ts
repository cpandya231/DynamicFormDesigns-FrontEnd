import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { NavBarItem } from '../navbar/navbar-item';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }
  token: any = "";
  email: any = "";

  ngOnInit(): void {


    this.activatedRoute.paramMap.subscribe(params => {
      let item = params.get("state");
      let decodedJwt = this.getDecodedAccessToken(item);
      this.email = decodedJwt.sub;
    })
  }


  navigate(url: string): any {
    this.router.navigate([`/${url}`]);

  }
  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}

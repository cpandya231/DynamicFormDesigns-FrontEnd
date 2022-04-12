import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  token: any = "";
  email: any = "";
  ngOnInit(): void {


    this.activatedRoute.paramMap.subscribe(params => {
      let item = params.get("state");
      let decodedJwt = this.getDecodedAccessToken(item);
      this.email = decodedJwt.sub;
    })
  }


  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}

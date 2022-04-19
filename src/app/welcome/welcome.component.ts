import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    console.log(`In Welcome ${localStorage.getItem('access_token')}`)
  }


  navigate(url: string): any {
    this.router.navigate([`/${url}`]);

  }

}

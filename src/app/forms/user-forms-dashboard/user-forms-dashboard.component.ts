import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-forms-dashboard',
  templateUrl: './user-forms-dashboard.component.html',
  styleUrls: ['./user-forms-dashboard.component.scss']
})
export class UserFormsDashboardComponent implements OnInit {

  appName: string;
  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.appName = this.route.snapshot.paramMap.get('appName') || '';
    localStorage.setItem('appName', this.appName);
  }


}

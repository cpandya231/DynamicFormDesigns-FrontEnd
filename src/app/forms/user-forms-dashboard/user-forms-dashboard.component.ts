import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-forms-dashboard',
  templateUrl: './user-forms-dashboard.component.html',
  styleUrls: ['./user-forms-dashboard.component.scss']
})
export class UserFormsDashboardComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
  }


}

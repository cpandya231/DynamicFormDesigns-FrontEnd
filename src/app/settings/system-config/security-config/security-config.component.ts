import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security-config',
  templateUrl: './security-config.component.html',
  styleUrls: ['./security-config.component.scss']
})
export class SecurityConfigComponent implements OnInit {

  InboundRules = [];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent implements OnInit {

  IsPasswordTabVisible: any = true;
  constructor() {

  }

  ngOnInit(): void {

  }

  LoadPasswordScreen() {

  }

}

import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent implements OnInit {

  IsUsernameTabVisible: any = true;
  IsPasswordTabVisible: any = false;
  IsSessionTabVisible: any = false;
  constructor() {

  }

  ngOnInit(): void {

  }

  LoadUsernameScreen() {
    this.IsUsernameTabVisible = true;
    this.IsPasswordTabVisible = false;
    this.IsSessionTabVisible = false;
  }
  LoadPasswordScreen() {
    this.IsUsernameTabVisible = false;
    this.IsPasswordTabVisible = true;
    this.IsSessionTabVisible = false;
  }

  LoadSessionScreen() {
    this.IsUsernameTabVisible = false;
    this.IsPasswordTabVisible = false;
    this.IsSessionTabVisible = true;
  }

}

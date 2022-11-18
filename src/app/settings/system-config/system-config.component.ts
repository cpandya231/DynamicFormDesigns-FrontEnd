import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { ISettingItem } from './settings-model';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent implements OnInit {
  isDataLoaded: boolean = false;
  usernameSettings: ISettingItem[];
  passwordSettings: ISettingItem[];
  sessionSettings: ISettingItem[];
  smtpSettings: ISettingItem[];
  globalSettings: ISettingItem[];
  IsUsernameTabVisible: any = true;
  IsPasswordTabVisible: any = false;
  IsSessionTabVisible: any = false;
  IsSmtpTabVisible: any = false;
  IsGlobalTabVisible: any = false;
  IsSecurityTabVisible: any = false;
  constructor(private settingService: SettingsService,) {

  }

  ngOnInit(): void {

    this.settingService.getAllSettings().subscribe(response => {
      this.usernameSettings = response.filter(item => item.type == "USERNAME");
      this.passwordSettings = response.filter(item => item.type == "PASSWORD");
      this.sessionSettings = response.filter(item => item.type == "SESSION");
      this.smtpSettings = response.filter(item => item.type == "SMTP");
      this.globalSettings = response.filter(item => item.type == "GLOBAL");
      this.isDataLoaded = true;
    });

  }

  LoadUsernameScreen() {
    this.hideAll();
    this.IsUsernameTabVisible = true;
  }
  LoadPasswordScreen() {
    this.hideAll();
    this.IsPasswordTabVisible = true;
  }

  LoadSessionScreen() {
    this.hideAll();
    this.IsSessionTabVisible = true;
  }

  LoadSmtpScreen() {
    this.hideAll();
    this.IsSmtpTabVisible = true;

  }

  LoadGlobalScreen() {
    this.hideAll();
    this.IsGlobalTabVisible = true;
  }

  LoadSecurityScreen() {
    this.hideAll();
    this.IsSecurityTabVisible = true;
  }

  hideAll() {
    this.IsUsernameTabVisible = false;
    this.IsPasswordTabVisible = false;
    this.IsSessionTabVisible = false;
    this.IsSmtpTabVisible = false;
    this.IsGlobalTabVisible = false;
    this.IsSecurityTabVisible = false;
  }


}

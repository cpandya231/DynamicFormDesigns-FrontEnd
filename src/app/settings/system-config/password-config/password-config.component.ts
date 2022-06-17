import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-password-config',
  templateUrl: './password-config.component.html',
  styleUrls: ['./password-config.component.scss']
})
export class PasswordConfigComponent implements OnInit {


  passwordForm = new FormGroup({
    ALPHANUMERIC: new FormControl(true),
    SPECIAL_CHARS_REQD: new FormControl(true),
    PASSWORD_MIN_LENGTH: new FormControl(8),
    EXPIRY_DAYS: new FormControl(365),
    MAX_ATTEMPTS: new FormControl(3),


  });
  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    this.settingService.getAllSettings().subscribe(response => {
      let passwordSettings = response.filter(item => item.type == "PASSWORD");
      let parsed = passwordSettings.map(passwordSetting => { `${passwordSetting.key}: ${passwordSetting.value}` })
      passwordSettings.forEach(passwordSetting => {
        if (passwordSetting.key == "MAX_ATTEMPTS") {
          this.passwordForm.patchValue({
            MAX_ATTEMPTS: passwordSetting.value
          })
        }

      })
    })
  }

  submitForm() {
    // TODO: Use EventEmitter with form value
    console.log(this.passwordForm.value);
  }

}

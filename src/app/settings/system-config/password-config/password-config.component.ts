import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';
import { ISettingItem } from '../settings-model';

@Component({
  selector: 'app-password-config',
  templateUrl: './password-config.component.html',
  styleUrls: ['./password-config.component.scss']
})
export class PasswordConfigComponent implements OnInit {

  passwordSettings: ISettingItem[];
  submitted = false;
  passwordForm = new FormGroup({
    ALPHANUMERIC: new FormControl(false),
    SPECIAL_CHARS_REQD: new FormControl(true),
    PASSWORD_MIN_LENGTH: new FormControl(8, Validators.required),
    EXPIRY_DAYS: new FormControl(365, [Validators.required,]),
    MAX_ATTEMPTS: new FormControl(3, [Validators.required,]),


  });
  constructor(private settingService: SettingsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fillForm();
  }

  private fillForm() {
    this.settingService.getAllSettings().subscribe(response => {
      this.passwordSettings = response.filter(item => item.type == "PASSWORD");

      let parsed: any = {};

      this.passwordSettings.forEach(passwordSetting => {
        if (passwordSetting.value == 'true') {
          parsed[passwordSetting.key] = true;
        } else if (passwordSetting.value == 'false') {
          parsed[passwordSetting.key] = false;
        } else {
          parsed[passwordSetting.key] = [passwordSetting.value, Validators.required];
        }


      });

      this.passwordForm = this.formBuilder.group(parsed);
    });
  }

  submitForm() {
    this.submitted = true;

    if (this.passwordForm.valid) {
      let submittedForm = this.passwordForm.value;
      for (let submitedItem of Object.keys(submittedForm)) {
        let passwordSettingToUpdate = this.passwordSettings.filter(ps => ps.key == submitedItem)[0];
        passwordSettingToUpdate.value = submittedForm[submitedItem];
        this.settingService.updateSettings(passwordSettingToUpdate).subscribe(response => {

        });

      }

      alert("Password settings updated successfully")
    } else {
      alert("Something went wrong");
    }

  }

  revertForm() {
    this.fillForm();
  }

  get passwordFormControl() {
    return this.passwordForm.controls;
  }

  get passwordMinLength() { return this.passwordForm.get('PASSWORD_MIN_LENGTH'); }

  get expiryDays() { return this.passwordForm.get('EXPIRY_DAYS'); }
  get maxAttempts() { return this.passwordForm.get('MAX_ATTEMPTS'); }

}

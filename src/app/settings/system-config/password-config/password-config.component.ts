import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { ISettingItem } from '../settings-model';

@Component({
  selector: 'app-password-config',
  templateUrl: './password-config.component.html',
  styleUrls: ['./password-config.component.scss']
})
export class PasswordConfigComponent implements OnInit {

  @Input('passwordSettings') passwordSettings: ISettingItem[];


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


    let parsed: any = {};

    this.passwordSettings.forEach(passwordSetting => {
      if (passwordSetting.value == 'true') {
        parsed[passwordSetting.key] = true;
      } else if (passwordSetting.value == 'false') {
        parsed[passwordSetting.key] = false;
      } else if (passwordSetting.key == 'PASSWORD_MIN_LENGTH') {
        parsed[passwordSetting.key] = [passwordSetting.value, [Validators.required, Validators.min(8)]];
      }
      else {
        parsed[passwordSetting.key] = [passwordSetting.value, [Validators.required]];
      }


    });

    this.passwordForm = this.formBuilder.group(parsed);

  }

  submitForm() {

    if (this.passwordForm.valid) {
      let submittedForm = this.passwordForm.value;

      let settingsObservables = [];
      for (let submitedItem of Object.keys(submittedForm)) {
        let passwordSettingToUpdate = this.passwordSettings.find(ps => ps.key == submitedItem);
        if (undefined != passwordSettingToUpdate) {
          passwordSettingToUpdate.value = submittedForm[submitedItem];
          settingsObservables.push(this.settingService.updateSettings(passwordSettingToUpdate));
        }


      }
      combineLatest(settingsObservables)
        .subscribe({
          next: (v) => alert("Session settings updated successfully"),
          error: (e) => alert("Something went wrong")
        });




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

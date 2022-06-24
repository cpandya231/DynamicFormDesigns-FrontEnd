import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { SettingsService } from 'src/app/services/settings.service';
import { ISettingItem } from '../settings-model';

@Component({
  selector: 'app-username-config',
  templateUrl: './username-config.component.html',
  styleUrls: ['./username-config.component.scss']
})
export class UsernameConfigComponent implements OnInit {

  @Input('usernameSettings') usernameSettings: ISettingItem[];

  usernameForm = new FormGroup({
    USERNAME_MIN_LENGTH: new FormControl(10),
    USERNAME_MAX_LENGTH: new FormControl(10),


  });

  constructor(private settingService: SettingsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fillForm();
  }


  private fillForm() {


    let parsed: any = {};

    this.usernameSettings.forEach(usernameSetting => {
      if (usernameSetting.value == 'true') {
        parsed[usernameSetting.key] = true;
      } else if (usernameSetting.value == 'false') {
        parsed[usernameSetting.key] = false;
      }
      else {
        parsed[usernameSetting.key] = [usernameSetting.value, [Validators.required, Validators.min(1)]];
      }


    });

    this.usernameForm = this.formBuilder.group(parsed);

  }


  submitForm() {

    if (this.usernameForm.valid) {
      let submittedForm = this.usernameForm.value;
      let settingsObservables = [];
      for (let submitedItem of Object.keys(submittedForm)) {
        let usernameSettingToUpdate = this.usernameSettings.find(ps => ps.key == submitedItem);
        if(undefined != usernameSettingToUpdate){
          usernameSettingToUpdate.value = submittedForm[submitedItem];
          settingsObservables.push(this.settingService.updateSettings(usernameSettingToUpdate));
        }
        

      }

      combineLatest(settingsObservables).subscribe({
        next: (v) => alert("Users settings updated successfully"),
        error: (e) => alert("Something went wrong")
      })


    } else {
      alert("Something went wrong");
    }

  }

  revertForm() {
    this.fillForm();
  }

  get usernameFormControl() {
    return this.usernameForm.controls;
  }

  get usernameMinLength() { return this.usernameForm.get('USERNAME_MIN_LENGTH'); }

  get usernameMaxLength() { return this.usernameForm.get('USERNAME_MAX_LENGTH'); }


}

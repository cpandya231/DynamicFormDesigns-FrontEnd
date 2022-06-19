import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';
import { ISettingItem } from '../settings-model';

@Component({
  selector: 'app-session-config',
  templateUrl: './session-config.component.html',
  styleUrls: ['./session-config.component.scss']
})
export class SessionConfigComponent implements OnInit {

  sessionSettings: ISettingItem[];

  sessionForm = new FormGroup({
    TIMEOUT: new FormControl(10),
    TIMEOUT_ALERT: new FormControl(10),


  });

  constructor(private settingService: SettingsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fillForm();
  }


  private fillForm() {
    this.settingService.getAllSettings().subscribe(response => {
      this.sessionSettings = response.filter(item => item.type == "SESSION");

      let parsed: any = {};

      this.sessionSettings.forEach(sessionSetting => {
        if (sessionSetting.value == 'true') {
          parsed[sessionSetting.key] = true;
        } else if (sessionSetting.value == 'false') {
          parsed[sessionSetting.key] = false;
        }
        else {
          parsed[sessionSetting.key] = [sessionSetting.value, [Validators.required, Validators.min(10)]];
        }


      });

      this.sessionForm = this.formBuilder.group(parsed);
    });
  }


  submitForm() {

    if (this.sessionForm.valid) {
      let submittedForm = this.sessionForm.value;
      for (let submitedItem of Object.keys(submittedForm)) {
        let sessionSettingToUpdate = this.sessionSettings.filter(ps => ps.key == submitedItem)[0];
        sessionSettingToUpdate.value = submittedForm[submitedItem];
        this.settingService.updateSettings(sessionSettingToUpdate).subscribe(response => {

        });

      }

      alert("Session settings updated successfully")
    } else {
      alert("Something went wrong");
    }

  }

  revertForm() {
    this.fillForm();
  }

  get sessionFormControl() {
    return this.sessionForm.controls;
  }

  get sessionTimeout() { return this.sessionForm.get('TIMEOUT'); }

  get sessionTimeoutAlert() { return this.sessionForm.get('TIMEOUT_ALERT'); }

}

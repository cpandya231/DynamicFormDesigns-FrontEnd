import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { ISettingItem } from '../settings-model';

@Component({
  selector: 'app-session-config',
  templateUrl: './session-config.component.html',
  styleUrls: ['./session-config.component.scss']
})
export class SessionConfigComponent implements OnInit {

  @Input('sessionSettings') sessionSettings: ISettingItem[];


  sessionForm = new FormGroup({
    TIMEOUT: new FormControl(10),
    TIMEOUT_ALERT: new FormControl(10),


  });

  constructor(private settingService: SettingsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fillForm();
  }


  private fillForm() {


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

  }


  submitForm() {

    if (this.sessionForm.valid) {
      let submittedForm = this.sessionForm.value;


      let settingsObservables = [];
      for (let submitedItem of Object.keys(submittedForm)) {
        let sessionSettingToUpdate = this.sessionSettings.find(ps => ps.key == submitedItem);
        if (undefined != sessionSettingToUpdate) {
          sessionSettingToUpdate.value = submittedForm[submitedItem];
          settingsObservables.push(this.settingService.updateSettings(sessionSettingToUpdate));
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

  get sessionFormControl() {
    return this.sessionForm.controls;
  }

  get sessionTimeout() { return this.sessionForm.get('TIMEOUT'); }

  get sessionTimeoutAlert() { return this.sessionForm.get('TIMEOUT_ALERT'); }

}

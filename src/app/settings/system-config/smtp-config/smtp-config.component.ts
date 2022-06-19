import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordMatchingValidatior } from 'src/app/directives/confirm-passowrd.directive';
import { SettingsService } from 'src/app/services/settings.service';
import { ISettingItem } from '../settings-model';

@Component({
  selector: 'app-smtp-config',
  templateUrl: './smtp-config.component.html',
  styleUrls: ['./smtp-config.component.scss']
})
export class SmtpConfigComponent implements OnInit {


  smtpSettings: ISettingItem[];

  smtpForm = new FormGroup({
    SMTP_SERVER_IP: new FormControl(''),
    SMTP_SERVER_PORT: new FormControl(8080),
    FROM_EMAIL: new FormControl(''),
    USERNAME: new FormControl(''),
    PASSWORD: new FormControl(''),
    CONFIRM_PASSWORD: new FormControl(''),

  });

  constructor(private settingService: SettingsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fillForm();
  }


  private fillForm() {
    this.settingService.getAllSettings().subscribe(response => {
      this.smtpSettings = response.filter(item => item.type == "SMTP");

      let parsed: any = {};

      this.smtpSettings.forEach(smtpSetting => {

        switch (smtpSetting.key) {
          case 'SMTP_SERVER_IP': {
            parsed[smtpSetting.key] = [smtpSetting.value, [Validators.required, Validators.pattern('((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\\.|$)){4}')]];
            break;
          }
          case 'SMTP_SERVER_PORT': {
            parsed[smtpSetting.key] = [smtpSetting.value, [Validators.required, Validators.min(0)]];
            break;
          }
          case 'FROM_EMAIL': {
            parsed[smtpSetting.key] = [smtpSetting.value, [Validators.required, Validators.email]];
            break;
          }
          default: {
            parsed[smtpSetting.key] = [smtpSetting.value, [Validators.required]];
            break;
          }
        }

      });


      this.smtpForm = this.formBuilder.group(parsed, { validators: passwordMatchingValidatior });
    });
  }


  submitForm() {

    if (this.smtpForm.valid) {
      let submittedForm = this.smtpForm.value;
      for (let submitedItem of Object.keys(submittedForm)) {
        let smtpSettingToUpdate = this.smtpSettings.filter(ps => ps.key == submitedItem)[0];
        smtpSettingToUpdate.value = submittedForm[submitedItem];
        this.settingService.updateSettings(smtpSettingToUpdate).subscribe(response => {

        });

      }

      alert("SMTP settings updated successfully")
    } else {
      alert("Something went wrong");
    }

  }

  revertForm() {
    this.fillForm();
  }

  get smtpFormControl() {
    return this.smtpForm.controls;
  }

  get smtpServerIP() { return this.smtpForm.get('SMTP_SERVER_IP'); }

  get smtpServerPort() { return this.smtpForm.get('SMTP_SERVER_PORT'); }

  get smtpEmail() { return this.smtpForm.get('FROM_EMAIL'); }

  get smtpUsername() { return this.smtpForm.get('USERNAME'); }

  get smtpPassword() { return this.smtpForm.get('PASSWORD'); }

  get smtpConfirmPassword() { return this.smtpForm.get('CONFIRM_PASSWORD'); }

}

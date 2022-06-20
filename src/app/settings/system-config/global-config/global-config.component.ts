import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { passwordMatchingValidatior } from 'src/app/directives/confirm-passowrd.directive';
import { SettingsService } from 'src/app/services/settings.service';
import { DateUtil } from 'src/app/services/utility/DateUtil';
import { ISettingItem } from '../settings-model';

@Component({
  selector: 'app-global-config',
  templateUrl: './global-config.component.html',
  styleUrls: ['./global-config.component.scss'],

})
export class GlobalConfigComponent implements OnInit {

  globalSettings: ISettingItem[];
  dateFormatArray: string[] = [DateUtil.DATE_FORMAT, DateUtil.DATE_FORMAT_SHORT];
  timeFormatArray: string[] = [DateUtil.TIME_FORMAT, DateUtil.TIME_FORMAT_24_HOURS];
  timestampFormatArray: string[] = [DateUtil.TIME_FORMAT_24_HOURS];
  selectedDateFormat: string;
  selectedTimeFormat: string;
  selectedTimestampFormat: string;

  globalForm = new FormGroup({
    DATE_FORMAT: new FormControl(''),
    TIME_FORMAT: new FormControl(''),
    TIMESTAMP_FORMAT: new FormControl(''),
    NO_OF_ACTIVE_USERS: new FormControl(10),
    VALIDITY_TILL: new FormControl(''),
    VALIDITY_EXPIRY_MSG: new FormControl(''),

  });

  constructor(private settingService: SettingsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fillForm();
  }


  private fillForm() {
    this.settingService.getAllSettings().subscribe(response => {

      this.globalSettings = response.filter(item => item.type == "GLOBAL");

      let parsed: any = {};

      this.globalSettings.forEach(globalSetting => {


        switch (globalSetting.key) {

          case 'NO_OF_ACTIVE_USERS': {
            parsed[globalSetting.key] = [globalSetting.value, [Validators.required, Validators.min(1)]];
            break;
          }
          case 'DATE_FORMAT': {
            parsed[globalSetting.key] = [globalSetting.value, [Validators.required,]];
            this.selectedDateFormat = globalSetting.value;
            break;
          }
          case 'TIME_FORMAT': {
            parsed[globalSetting.key] = [globalSetting.value, [Validators.required,]];
            this.selectedTimeFormat = globalSetting.value;
            break;
          }
          case 'TIMESTAMP_FORMAT': {
            parsed[globalSetting.key] = [globalSetting.value, [Validators.required,]];
            this.selectedTimestampFormat = globalSetting.value;
            break;
          }

          default: {
            parsed[globalSetting.key] = [globalSetting.value, [Validators.required,]];
            break;
          }
        }

      });
      this.globalForm = this.formBuilder.group(parsed);
    });




  }


  submitForm() {

    if (this.globalForm.valid) {
      let submittedForm = this.globalForm.value;
      for (let submitedItem of Object.keys(submittedForm)) {
        let globalSettingToUpdate = this.globalSettings.filter(ps => ps.key == submitedItem)[0];
        globalSettingToUpdate.value = submittedForm[submitedItem];
        this.settingService.updateSettings(globalSettingToUpdate).subscribe(response => {

        });

      }

      alert("Global settings updated successfully")
    } else {
      alert("Something went wrong");
    }

  }

  revertForm() {
    this.fillForm();
  }

  get globalFormControl() {
    return this.globalForm.controls;
  }

  get dateFormat() { return this.globalForm.get('DATE_FORMAT'); }

  get timeFormat() { return this.globalForm.get('TIME_FORMAT'); }

  get timestampFormat() { return this.globalForm.get('TIMESTAMP_FORMAT'); }

  get numberOfActiveUsers() { return this.globalForm.get('NO_OF_ACTIVE_USERS'); }

  get validityTill() { return this.globalForm.get('VALIDITY_TILL'); }

  get expiryMessage() { return this.globalForm.get('VALIDITY_EXPIRY_MSG'); }

}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { FormsService } from '../../common/services/forms.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-create-form-template',
  templateUrl: './create-form-template.component.html',
  styleUrls: ['./create-form-template.component.scss']
})
export class CreateFormTemplateComponent implements OnInit {

  @ViewChild('formio') formIO: any;
  @Input('formName') FormName: string;
  @Output() WorkflowIdUpdate = new EventEmitter<number>();
  CurrentForm: any = {
    components: []
  };
  IsFormLoaded = false;
  formId: number = 0;
  SiteName = 'Moraiya';
  DepartmentName = 'Tablet Facility IX ';
  RoomIDList = [101, 102, 103, 104, 105];
  ActivitiesList = ['Environmental conditional monitoring'];
  EnabledFormElements = ['textfield', 'email', 'textarea', 'phoneNumber', 'number', 'date', 'password', 'checkbox', 'time', 'selectboxes', 'select',
    'radio', 'file', 'button', 'table', 'tabs',];
  FormOptions: any = {
    builder: {
      basic: {
        components: {
          email: true,
          phoneNumber: true,
          datetime: true,
          time: true,
          file: true
        }
      },
      layout: {
        components: {
          htmlelement: false,
          content: false,
          well: false,
          panel: false,
          columns: true,
          fieldset: false,

        }
      },
      advanced: false,
      // data: false,
      premium: false,
      custom: {
        title: 'Pre-Defined Fields',
        weight: 10,
        components: {
          site: {
            title: 'Site',
            key: 'site',
            schema: {
              label: 'Site',
              type: 'textfield',
              key: 'site',
              input: true,
              defaultValue: this.SiteName,
              disabled: true,
              labelMargin: 5,
              labelPosition: 'left-left'
            }
          },
          department: {
            title: 'Department',
            key: 'department',
            schema: {
              label: 'Department',
              type: 'textfield',
              key: 'department',
              input: true,
              defaultValue: this.DepartmentName,
              disabled: true,
              labelMargin: 5,
              labelPosition: 'left-left'
            }
          },
          currentDate: {
            title: 'Date',
            key: 'currentDate',
            schema: {
              label: 'Date',
              type: 'textfield',
              key: 'currentDate',
              input: true,
              disabled: true,
              labelMargin: 5,
              labelPosition: 'left-left',
              customDefaultValue: "value = moment(new Date()).format(\"DD/MM/YYYY\")",
            }
          },
          roomID: {
            title: 'Room ID',
            key: 'roomId',
            schema: {
              label: 'Room ID',
              input: true,
              data: {
                json: this.RoomIDList
              },
              dataSrc: "json",
              key: "roomId",
              labelMargin: 5,
              labelPosition: "left-left",
              template: "<span>{{ item.label }}</span>",
              type: "select",
              widget: "choicesjs"
            }
          },
          activity: {
            title: 'Activity',
            key: 'activity',
            schema: {
              label: 'Activity',
              input: true,
              data: {
                json: this.ActivitiesList
              },
              dataSrc: "json",
              key: "roomId",
              labelMargin: 5,
              labelPosition: "left-left",
              template: "<span>{{ item.label }}</span>",
              type: "select",
              widget: "choicesjs"
            }
          },
        }
      }
    },
    noDefaultSubmitButton: true,
    editForm: {
    },
  };
  WorkflowId: number;
  constructor(private formsService: FormsService,
    private authService: AuthService,
    private router: Router,
    private userService: UsersService) { }

  ngOnInit() {
    let eleObj = {};
    this.EnabledFormElements.forEach(ele => {
      let obj = {
        [ele]: [
        {
          key: 'display',
          components: this.ignoreComponents(
            ['widget', 'autocomplete', 'inputMask', 'displayMask', 'allowMultipleMasks', 'tabindex', 'modalEdit',
              'hideLabel', 'showWordCount', 'showCharCount', 'mask', 'tableView', 'description']
          )
        },
        {
          key: 'validation',
          components: this.ignoreComponents(
            ['validate.minWords', 'validate.maxWords', 'errorLabel', 'custom-validation-js', 'validate.customMessage', 'errors', 'json-validation-json']
          )
        },
        {
          key: 'data',
          components: this.ignoreComponents(
            ['persistent', 'inputFormat', 'protected', 'dbIndex', 'encrypted', 'redrawOn', 'calculateServer', 'idPath', 'selectThreshold', 'useExactSearch',
             'dataType', 'searchEnabled', 'calculateValuePanel', 'calculateValue-json', 'allowCalculateOverride', 'customDefaultValue-json']
          )
        },
        {
          key: 'api',
          components: this.ignoreComponents(
            ['tags', 'properties']
          )
        },
        {
          key: 'layout',
          components: this.ignoreComponents([
            'overlay'
          ])
        }
        ]
      };
      Object.assign(eleObj, obj);
    });
    this.FormOptions.editForm = { ...eleObj };

    if (this.FormName.length) {
      this.formsService.GetFormTemplate(this.FormName).subscribe(data => {
        console.log(data);
        this.FormName = data.name;
        this.CurrentForm.components = JSON.parse(data.template).components;
        this.IsFormLoaded = true;
        this.formId = data.id;
      })
    } else {
      this.IsFormLoaded = true;
    }

    forkJoin([this.userService.getUserByUsername(localStorage.getItem("username")),
      this.authService.getAccessToken().asObservable()]).subscribe(data => {
        const token = data[1];
        this.FormOptions['firstName'] = data[0].first_name;
        this.FormOptions['lastName'] = data[0].last_name;
        this.FormOptions['department'] = data[0].department;
        this.FormOptions['Authorization'] = `Bearer ${token}`;
    });
  }

  SaveTemplate(): void {
    if (this.formId) {
      this.formsService.UpdateFormTemplate(this.formIO.form, this.FormName, this.formId).subscribe(data => {
     
        alert('form updated successfully');
        // this.router.navigate(['formsDashboard']);
      })
    } else {
      this.formsService.SaveFormTemplate(this.formIO.form, this.FormName).subscribe(data => {
        this.WorkflowId = data.workflow.id;
        this.WorkflowIdUpdate.emit(this.WorkflowId);
        alert('form created successfully');
        // this.router.navigate(['formsDashboard']);
      })
    }
  }

  CancelChanges(): void {
    this.router.navigate(['formsDashboard']);
  }

  protected ignoreComponents(components: string[]): any[] {
    let ignoredComp: any[] = [];
    components.forEach(comp => {
      ignoredComp.push(
        {
          key: comp,
          ignore: true
        }
      )
    });
    return ignoredComp;
  }
}

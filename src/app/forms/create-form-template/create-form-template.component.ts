import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioOptions } from '@formio/angular';
import { FormsService } from '../../common/services/forms.service';

@Component({
  selector: 'app-create-form-template',
  templateUrl: './create-form-template.component.html',
  styleUrls: ['./create-form-template.component.scss']
})
export class CreateFormTemplateComponent implements OnInit {

  @ViewChild('formio') formIO: any;
  FormName: string= '';
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
      'radio',  'file','button', 'table', 'tabs'];
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
          columns: false,
          fieldset: false,
        }
      },
      advanced: false,
      data: false,
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
  constructor(private formsService: FormsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    let params = this.activatedRoute.snapshot.paramMap;
    this.FormName = String(params.get('name') || '');
    let eleObj = {};
    this.EnabledFormElements.forEach(ele => {
      let obj = {
        [ele]:  [...this.ignoreComponents(['logic', 'layout']),
        {
          key: 'display',
          components: this.ignoreComponents(
            ['widget.type', 'autocomplete', 'inputMask', 'displayMask', 'allowMultipleMasks', 'tabindex', 'modalEdit', 
          'hidden', 'hideLabel', 'showWordCount', 'showCharCount', 'mask', 'tableView']
            )
        },
        {
          key: 'validation',
          components: this.ignoreComponents(
            ['validate.minWords', 'validate.maxWords', 'validate.pattern', 'errorLabel', 'custom-validation-js', 'validate.customMessage', 'errors', 'json-validation-json']
          )
        },
        {
          key: 'api',
          components: this.ignoreComponents(
            ['tags', 'properties']
          )
        },
        {
          key: 'conditional',
          components: this.ignoreComponents(['customConditionalPanel'])
        }
      ]};
      Object.assign(eleObj, obj);
    });
    this.FormOptions.editForm = {...eleObj};

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
  }

  SaveTemplate(): void {
    this.formsService.SaveFormTemplate(this.formIO.form, this.FormName, this.formId).subscribe(data => {
      alert('form created successfully');
      this.router.navigate(['formsDashboard']);
    })
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

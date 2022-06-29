import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioComponent } from '@formio/angular';
import { FormsService } from 'src/app/common/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';
import { Location } from '@angular/common';
@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  formName: any;
  entryId: any;
  userRoles: any;
  constructor(
    private formService: FormsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) { }
  CurrentForm: any = {
    components: []
  };
  @ViewChild(FormioComponent, { static: false })
  form!: FormioComponent;
  IsFormLoaded = false;
  formId: number = 0;
  FormOptions = MasterForms.FormOptions;

  toState: any;
  workflowId: any;

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.formName = String(params.get('formName') || '');
    this.entryId = Number(params.get('entryId') || '');
    this.userRoles = this.authService.getRoles();
    this.formService.GetFormTemplate(this.formName).subscribe(data => {

      this.CurrentForm.components = JSON.parse(data.template).components;
      this.workflowId = data.workflow["id"];

      this.formId = data.id;

      this.formService.GetWorkflowStatesTransitions(this.workflowId).subscribe(data => {
        let requiredTransition = data.transitions.find(transition => transition.fromState.roles.filter(transtionRole => this.userRoles.includes(transtionRole.role)).length > 0);
        if (null != requiredTransition) {
          this.toState = requiredTransition.toState.name;
          this.IsFormLoaded = true;
        } else {
          alert("No valid transition found");
          this.close();
        }
      })


    })
  }


  onSubmit() {
    this.form.formio.emit('submitButton');

  }

  handleSubmit() {


    let submittedData = this.form.formio.submission.data;

    if (this.entryId) {
      let logEntryObj = {
        id: this.entryId,
        state: this.toState,
        data: submittedData

      }
      this.formService.UpdateLogEntry(this.formId, logEntryObj).subscribe({
        next: (data) => {
          alert("Entry Updated Successfully!!");
          this.close();
        },
        error: (err) => {
          alert("Error occured while updating entry");
          console.log(err)
        }
      });

    } else {
      let logEntryObj = {
        state: this.toState,
        data: submittedData
      }
      this.formService.SaveLogEntry(this.formId, logEntryObj).subscribe({
        next: (data) => {
          alert("Entry Created Successfully!!");
          this.close();
        },
        error: (err) => {
          alert("Error occured while updating entry");
          console.log(err)
        }
      });
    }



  }

  close() {
    this._location.back();
  }


}

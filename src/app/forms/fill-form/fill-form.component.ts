import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioComponent } from '@formio/angular';
import { FormsService } from 'src/app/common/services/forms.service';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  formName: any;
  constructor(
    private formService: FormsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }
  CurrentForm: any = {
    components: []
  };
  @ViewChild(FormioComponent, { static: false })
  form!: FormioComponent;
  IsFormLoaded = false;
  formId: number = 0;
  FormOptions = MasterForms.FormOptions;
  fromState: any;
  toState: any;
  workflowId: any;

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.formName = String(params.get('formName') || '');
    this.formService.GetFormTemplate(this.formName).subscribe(data => {

      this.CurrentForm.components = JSON.parse(data.template).components;
      this.workflowId = data.workflow["id"];

      this.formId = data.id;
      this.fromState = "First";
      this.formService.GetWorkflowStatesTransitions(this.workflowId).subscribe(data => {
        let requiredTransition = data.transitions.find(transition => transition.fromState.name == this.fromState);
        if (null != requiredTransition) {
          this.toState = requiredTransition.toState.name;
          this.IsFormLoaded = true;
        } else {
          alert("No valid transition found")
        }
      })


    })
  }


  onSubmit() {
    this.form.formio.emit('submitButton');

  }

  handleSubmit() {


    let submittedData = this.form.formio.submission.data;
    let logEntryObj = {
      state: this.toState,
      data: submittedData

    }

    this.formService.LogEntry(this.formId, logEntryObj).subscribe({
      next: (data) => {
        alert("Success");
        this.close();
      },
      error: (err) => console.log(err)
    });

  }

  close() {
    this.router.navigate(['../../formsInProgressData', this.formId, this.formName], { relativeTo: this.activatedRoute });
  }


}

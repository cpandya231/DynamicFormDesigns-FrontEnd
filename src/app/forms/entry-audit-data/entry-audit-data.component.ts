import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsService } from 'src/app/common/services/forms.service';
@Component({
  selector: 'app-entry-audit-data',
  templateUrl: './entry-audit-data.component.html',
  styleUrls: ['./entry-audit-data.component.scss']
})
export class EntryAuditDataComponent implements OnInit {
  formName: any;
  entryId: any;
  formId: number = 0;
  forms: any = []
  CurrentForm: any = {
    components: []
  };
  FormOptions = {

    "alerts": {
      "submitMessage": "Entry created/updated successfully"
    }
  };
  IsFormLoaded = false;
  constructor(
    private formService: FormsService,
    private activatedRoute: ActivatedRoute,
    private _location: Location,) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.formName = String(params.get('formName') || '');
    this.entryId = Number(params.get('entryId') || '');
    this.formId = Number(params.get('formId') || '');
    this.formService.GetFormTemplate(this.formName, this.formId).subscribe(data => {
      this.CurrentForm.components = JSON.parse(data.template).components;
      let entryDataObservable = this.formService.LogEntryMetadata(this.formId, this.entryId);
      entryDataObservable.subscribe({
        next: (entryMetaData) => {
          entryMetaData.forEach((element: any) => {
            let newForm = JSON.parse(JSON.stringify(this.CurrentForm));

            newForm.updatedBy = element.data["created_by"];
            newForm.updatedOn = element.data["log_create_dt"];
            newForm.components.forEach((table: any) => {
              table.rows.forEach((rowItem: any) => {
                rowItem.forEach((rowItemComponent: any) => {
                  rowItemComponent.components.forEach((component: any) => {


                    if (element.data["" + component.key]) {
                      let componentValue = element.data["" + component.key];
                      component.defaultValue = componentValue;
                      component.disabled = true;
                    } else {
                      component.hidden = true;
                    }

                  });
                });
              });

            });
            this.forms.push(newForm);
          });

          this.IsFormLoaded = true;

        },
        error: (err) => {
          console.log(err.error.message);
          alert("No data found")
        }

      })
    });
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'cta-buttons-component',
  template: `
    <div class="table-icons">
        <img style="height:18px" src="assets/Images/pen-to-square-solid.svg" alt="edit" (click)="FillForm()">
        <img style="height:18px" src="assets/Images/hourglass-half-solid.svg" (click)="ShowProgress()">
        <img style="height:18px" src="assets/Images/file-solid.svg" (click)="viewAuditReport()">
</div>
  `,
  styles: [`.table-icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 6em;
    padding-right: 1em;
 
}`]
})

export class CtaButtonsRenderer implements ICellRendererAngularComp {
    public cellValue!: string;
    entryId!: number;
    params: any;

    constructor( private router: Router,
        private activatedRoute: ActivatedRoute,){}
    // gets called once before the renderer is used
    agInit(params: ICellRendererParams): void {
      this.entryId = params.data.id;
      this.params = params;
    }
  
    refresh(params: ICellRendererParams) {
        return false;
    }

    FillForm() {
        this.router.navigate(['../../../../updateLogEntry', this.params.formName, this.entryId], { relativeTo: this.activatedRoute, state: { formId: this.params.formId, isMasterForm: this.params.isMasterForm } });
    }

    ShowProgress() {
        this.params.context.componentParent.ShowProgress(this.entryId);
    }

    viewAuditReport() {
        this.params.context.componentParent.viewAuditReport(this.entryId);
    }
  }
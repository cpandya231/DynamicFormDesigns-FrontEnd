import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/common/services/forms.service';
import { DisplayWorkflowStatusComponent } from 'src/app/common/display-workflow-status/display-workflow-status.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { IGetWorkflowStateTransitionsModel, IWorkflowStateModel } from '../../form-workflow/form-workflow.model';
import { combineLatest, elementAt } from 'rxjs';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CtaButtonsRenderer } from './cta-buttons.renderer.component';


@Component({
  selector: 'app-user-forms-in-progress-data',
  templateUrl: './user-forms-in-progress-data.component.html',
  styleUrls: ['./user-forms-in-progress-data.component.scss']
})
export class UserFormsInProgressDataComponent implements OnInit {
  ShowfilteredEntries: boolean;
  currentPage = 1;
  pageSize = 5;
  count = 80;
  userRoles: any;
  logEntries: any[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  logEntries$: any;
  copyLogEntries: any[];
  formId: number;
  formName: string;
  workflowId: number;
  isDataLoaded: boolean = false;
  columnsToDisplay: string[];
  selectedChoice: any = 'all';
  enableCreateNewEntry: boolean = false;
  disabledColumns: string[];
  visibleColumns: string[];
  defaultFirstColumns: string[] = ["cta_buttons", "id", "state",];
  defaultLastColumns: string[] = ["created_by", "log_create_dt", "updated_by", "log_update_dt"];
  isMasterForm = false;
  finalStateName: any;
  PendingEntries: any;
  finalState: any;
  showPending = false;
  defaultColDef!: ColDef;
  columnDefs: any[] = [];
  rowData: any[] = [];
  showGrid = false;
  private gridApi!: GridApi<any>;
  context: any;
  constructor(private formsService: FormsService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog) { 
      this.context = { componentParent: this };
    }

  ngOnInit(): void {
    this.setData();
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true
    };

    this.columnDefs.push(...[
      {
        field: 'cta_buttons',
        headerName: '',
        cellRenderer: CtaButtonsRenderer,
        cellRendererParams: {
          formName: this.formName,
          formId: this.formId,
          isMasterForm: this.isMasterForm
        },
        width: 100
      },
      {
        field: 'id',
        width: 90
      },
      {
        field: 'state',
        cellStyle: (params: any) => {
          if (params.value !== this.finalStateName) {
              //mark police cells as red
              return {color: 'red',};
          } else {
            return {color: 'green'}
          }
          return null;
      }
      }
    ])
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  private setData() {
    this.userRoles = this.authService.getRoles();
    let params = this.activatedRoute.snapshot.paramMap;
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.formId = Number(params.get('formId') || '');
    this.formName = String(params.get('formName') || '');
    this.workflowId = Number(params.get('workflowId') || '');
    this.isMasterForm = params.get('isMasterForm') ? true : false;
    let logEntriesObservable = this.formsService.GetLogEntries(this.formId, false);
    this.logEntries$ = logEntriesObservable;
    let transitionsObservable = this.formsService.GetWorkflowStatesTransitions(this.workflowId);
    combineLatest([logEntriesObservable, transitionsObservable]).subscribe(items => {
      let entryData = items[0];
      let mappedData = items[0].map((item: any) => item.data);
      this.dataSource = new MatTableDataSource<any>(mappedData);

      let transitionData = items[1];
      this.finalState = transitionData.states.find((state: IWorkflowStateModel) => state.endState == true);
      this.PendingEntries = entryData.filter((entry: any) => entry.data.state !== this.finalState?.name).map((columnData: any) => columnData.data);
      this.getLogEntries(entryData, transitionData);
      this.canCreateNewEntry(transitionData);
    });
  }

  private getLogEntries(entryData: any, transitionData: IGetWorkflowStateTransitionsModel) {

    let userTransition = transitionData.transitions.
      find(transition => transition.fromState.roles.filter(transitionRole => this.userRoles == transitionRole.role).length > 0)

    this.finalStateName = transitionData.states.find(state => state.endState)?.name;
    this.disabledColumns = userTransition?.fromState?.disabledColumns?.split(',') || [];
    this.visibleColumns = userTransition?.fromState?.visibleColumns?.split(',') || [];
    this.count = entryData.length;
    if (entryData.length > 0) {
      entryData = entryData.sort((a: any, b: any) => (parseInt(a.data.id) > parseInt(b.data.id) ? -1 : 1));
      this.logEntries = entryData.map((element: any, index: number) => {
        element["page"] = Math.floor(index / this.pageSize);
        return element;
      }).filter((el: any) => el["page"] == this.currentPage - 1);
      this.columnsToDisplay = this.visibleColumns.concat(this.defaultLastColumns);
      this.columnsToDisplay = this.columnsToDisplay.filter(col => col);
      this.columnsToDisplay.forEach(column => {
        this.columnDefs.push(
          {
            field: column
          }
        )
      });
      this.rowData = entryData.map((columnData: any) => columnData.data);
      this.copyLogEntries = [...this.rowData];
      // this.columnsToDisplay = this.columnsToDisplay.slice(0, 4)
      this.isDataLoaded = true;
    } else {
      this.logEntries = [];
      this.isDataLoaded = true;
    }
  }

  private canCreateNewEntry(transitionData: IGetWorkflowStateTransitionsModel) {
    let allToStates = transitionData.transitions.filter(transition => !transition.sendBackTransition).map(transition => transition.toState.id);
    let firstState = transitionData.states.find(state => !allToStates.includes(state.id) && !state.sendBackAvailable);
    let rolesForAccess = firstState?.roles.find(stateRole => this.userRoles == stateRole.role);
    if (rolesForAccess) {
      this.enableCreateNewEntry = transitionData.transitions.filter(transition => transition.fromState.id == firstState?.id).length > 0;
    } else {
      this.enableCreateNewEntry = false
    }
  }

  // FillForm(entryId: number) {
  //   this.router.navigate(['../../../../updateLogEntry', this.formName, entryId], { relativeTo: this.activatedRoute, state: { formId: this.formId, isMasterForm: this.isMasterForm } });
  // }

  createNewEntry() {
    this.router.navigate(['../../../../createLogEntry', this.formName], { relativeTo: this.activatedRoute, state: { formId: this.formId, isMasterForm: this.isMasterForm } });
  }

  handleChange() {
    let filterbyusername = this.selectedChoice == "username";

    // this.getLogEntries(filterbyusername);
  }

  viewAuditReport(entryId: number) {
    this.router.navigate(['../../../../auditLogEntry', this.formName, this.formId, entryId], { relativeTo: this.activatedRoute });
  }
  ShowProgress(entryId: number) {
    let stateStatusData,
      stateTransitionsData;
    this.formsService.LogEntryMetadata(this.formId, entryId).subscribe((metaData: any) => {
      this.formsService.GetWorkflowStatesTransitions(this.workflowId).subscribe((data: any) => {
        stateStatusData = metaData.map((state: any) => state.data);
        stateTransitionsData = data;
        const WorkflowLinks = [...this.getWorkflowLinks(stateTransitionsData.transitions)];
        const WorkflowStates = this.transformStateTransitions(stateTransitionsData, stateStatusData, WorkflowLinks);
        this.dialog.open(DisplayWorkflowStatusComponent, {
          data: {
            workflowId: this.workflowId,
            WorkflowStates,
            WorkflowLinks
          },
          panelClass: 'display-state-status',

        });
      })
    })
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  SortPendingItems() {
    this.rowData = this.PendingEntries;
    this.ShowfilteredEntries = true;
  }

  ShowAllItems() {
    this.rowData = this.copyLogEntries;
    this.ShowfilteredEntries = false;
  }
  togglePendingAll(event: any) {
    console.log('toggle', event.checked);
    this.showPending = event.checked;
    if (this.showPending) {
      this.rowData = this.PendingEntries;
    } else {
      this.rowData = this.copyLogEntries;
    }


  }
  protected transformStateTransitions(data: any, statusData: any, workflowLinks: any): any {
    return data.states.map((state: any) => {
      const toStateName = (data.transitions.find((link: any) => (link.fromState.id === state.id) && !link.sendBackTransition))?.toState.name;
      const updateDetails = statusData.find((status: any) => status.state === toStateName);
      return {
        id: state.id,
        label: state.name,
        dimension: {
          width: 170,
          height: 70
        },
        createdBy: updateDetails ? `${updateDetails.created_by} completed at ` : toStateName ? 'Pending' : '',
        timeStamp: updateDetails ? `${updateDetails.log_create_dt}` : ''
      }
    });
  }

  protected getWorkflowLinks(data: any) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    return data.map((link: any, index: number) => {
      let id = '';
      for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return {
        id,
        source: link.fromState.id,
        target: link.toState.id
      }
    })
  }

  back() {
    this.location.back();
  }

  handlePageChange(event: any) {
    this.currentPage = event;
    this.setData();
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.gridApi.setQuickFilter(filterValue);
  }

   onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-display-workflow-status',
  templateUrl: './display-workflow-status.component.html',
  styleUrls: ['./display-workflow-status.component.scss']
})
export class DisplayWorkflowStatusComponent implements OnInit {

  WorkflowLinks: any;
  WorkflowStates: any;
  curve: any = shape.curveLinear;
  draggingEnabled: boolean = false;
  panningEnabled: boolean = false;
  zoomEnabled: boolean = false;
  zoomSpeed: number = 0.2;
  minZoomLevel: number = 0.2;
  maxZoomLevel: number = 2.0;
  panOnZoom: boolean = false;
  autoCenter = true;
  autoZoom = true;
  constructor(public dialogRef: MatDialogRef<DisplayWorkflowStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.WorkflowStates = this.dialogData.WorkflowStates;
    this.WorkflowLinks = this.dialogData.WorkflowLinks;
  }

}

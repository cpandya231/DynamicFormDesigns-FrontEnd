import { Component, Renderer2, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MdbModalConfig, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { map } from 'rxjs';
import { DepartmentService } from '../services/departments.service';
import { CreateDepartmentComponent } from './create-department/create-department.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, AfterViewInit {
  @ViewChild('inserttarget', { static: false }) public insertTarget: ElementRef;
  isDataLoaded: boolean = false;
  private modalRef: MdbModalRef<CreateDepartmentComponent> | null = null;
  nodes: any = [];


  constructor(
    private departmentService: DepartmentService,
    private modalService: MdbModalService,
    private renderer: Renderer2,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.setData();
    this.initDeparmentAddedSubscription();
  }


  private setData() {
    let allDepartMents = this.departmentService.getAllDepartment()
      .pipe(map(departmentResponse => {
        return departmentResponse.map((department: { [x: string]: any; }) => {
          return this.buildNodes(departmentResponse, department);
        });
      }));
    allDepartMents.subscribe(departmentNodes => {
      this.nodes = departmentNodes;
      this.isDataLoaded = true;
    });
  }

  buildNodes(departments: any, root: any): any {
    if (root["visited"]) {
      return;
    }
    let internalNode: any = { "name": root["name"], "id": root["id"] };
    let children = [];

    for (let department of departments) {

      if (department["parentId"] == root["id"]) {

        let child = this.buildNodes(departments, department);
        department["visited"] = true;
        children.push(child);
      }
    }
    internalNode["childs"] = children;
    root["visited"] = true;
    return internalNode;
  }

  initDeparmentAddedSubscription() {
    this.departmentService.departmentAdded.subscribe((data: boolean) => {
      if (data) {
        this.setData();
      }
    });
  }




  handleSubmit(event: any): void {

    let mdbModalConfig: MdbModalConfig = {
      backdrop: false,
      data: {
        parentId: parseInt(event.id)
      }
    };
    this.modalRef = this.modalService.open(CreateDepartmentComponent, mdbModalConfig);


  }

  public ngAfterViewInit(): void {
    this.addNewButton(this.el); // Inserted into root
  }


  public addNewButton(insertTarget: ElementRef): void {

    const parentObject = document.getElementsByClassName('ngx-org-box');
    [...parentObject].forEach((parent, i) => {

      const childElement = document.createElement('div');
      childElement.className = 'second';
      childElement.innerHTML = `second ${i}`;
      parent.appendChild(childElement)
    });
    // Insert into "insertTarget"
  }


}

import { Component, OnInit } from '@angular/core';
import { MdbModalConfig, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { map } from 'rxjs';
import { DepartmentService } from '../services/departments.service';
import { CreateDepartmentComponent } from './create-department/create-department.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  constructor(private departmentService: DepartmentService, private modalService: MdbModalService) { }
  isDataLoaded: boolean = false;
  private modalRef: MdbModalRef<CreateDepartmentComponent> | null = null;
  nodes: any = [];

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




  test(event: any): void {
    console.log("Something clicked!!");
    let mdbModalConfig: MdbModalConfig = {
      backdrop: false,
      data: {
        parentId: parseInt(event.id)
      }
    };
    this.modalRef = this.modalService.open(CreateDepartmentComponent, mdbModalConfig);


  }


}

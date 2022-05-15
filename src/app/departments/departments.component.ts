import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs';
import { DepartmentService } from '../services/departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  constructor(private departmentService: DepartmentService) { }
  isDataLoaded: boolean = false;

  nodes: any = [
    {
      name: 'Sundar Pichai',

      image: '',

      childs: [
      ]
    },
  ];
  ngOnInit(): void {


    let allDepartMents = this.departmentService.getAllDepartment()
      .pipe(map(departmentResponse => {
        return departmentResponse.map((department: { [x: string]: any; }) => {


          return this.buildNodes(departmentResponse, department);


        });
      }));
    allDepartMents.subscribe(departmentNodes => {
      this.nodes = departmentNodes;
      this.isDataLoaded = true;
    })
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




  test(event: any): void {
    console.log("Something clicked!!")
  }
}

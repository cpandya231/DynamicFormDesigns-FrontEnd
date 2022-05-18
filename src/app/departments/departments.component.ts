// @ts-nocheck

import { Component, Renderer2, ElementRef, OnInit, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { MdbModalConfig, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { map } from 'rxjs';
import { hierarchy, tree } from 'd3-hierarchy';

import { DepartmentService } from '../services/departments.service';
import { CreateDepartmentComponent } from './create-department/create-department.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DepartmentsComponent implements OnInit, AfterViewInit {


  const treeData = {
    "name": "Eve",

    "type": "black",

    "children": [
      {
        "name": "Cain",

        "type": "grey",

      },
      {
        "name": "Seth",

        "type": "grey",

        "children": [
          {
            "name": "Enos",

            "type": "grey",

          },
          {
            "name": "Noam",

            "type": "grey",

          }
        ]
      },
      {
        "name": "Abel",

        "type": "grey",

      },
      {
        "name": "Awan",
        "type": "grey",

        "children": [
          {
            "name": "Enoch",

            "type": "grey",

          }
        ]
      },
      {
        "name": "Azura",

        "type": "grey",

      }
    ]
  };

  private svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  private group: any;
  private margin = { top: 30, right: 120, bottom: 20, left: 20 };

  private width = window.innerWidth * 0.9;
  private height = window.innerHeight;

  private i = 0;
  private duration = 750;
  private root;




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
    // this.setData();
    // this.initDeparmentAddedSubscription();

    this.createSvg();
    this.drawTree(this.root);
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



  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
    this.group = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");



  }

  private drawTree(root): void {
    const treemap = d3.tree().size([this.width, this.height]);
    let nodes = d3.hierarchy(this.treeData, d => d.children);

    nodes = treemap(nodes);
    nodes.descendants().forEach(function (d) { d.y = d.depth * 200; });

    const link = this.group.selectAll(".link")
      .data(nodes.descendants().slice(1))
      .enter().append("path")
      .attr("class", "link")
      .style("stroke", d => d.data.level)

      .attr("d", d => {
        return "M" + d.x + "," + d.y
          + "C" + (d.x + d.parent.x) / 2 + "," + d.y
          + " " + (d.x + d.parent.x) / 2 + "," + d.parent.y
          + " " + d.parent.x + "," + d.parent.y;
      });


    const node = this.group.selectAll(".node")
      .data(nodes.descendants())
      .enter().append("g")
      .attr("class", d => "node" + (d.children ? " node--internal"
        : " node--leaf"))
      .attr("transform", d => "translate(" + d.x + "," +
        d.y + ")");


    const rect = node.append("rect")
      .attr('class', "rectangle-custom")
      .attr('x', -50)
      .attr('y', 0);

    



  }

  click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }

}

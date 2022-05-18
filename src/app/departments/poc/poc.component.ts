
import { AfterContentChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';
import { map } from 'rxjs';
import { DepartmentService } from 'src/app/services/departments.service';
@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PocComponent implements OnInit, AfterViewInit {
  isDataLoaded: boolean = false;
  @ViewChild('chartContainer') chartContainer: ElementRef;

  @Input() data: any[];
  chart;

  constructor(private departmentService: DepartmentService, private renderer: Renderer2) {
    if (!this.chart) {
      this.chart = new OrgChart();

    }



  }

  ngOnInit() {
    this.setData();
  }

  openAlert(event: any) {
    let departmentId = event.currentTarget.attributes["department-id"]["nodeValue"]
    alert(`hello ${departmentId}`);
  }


  ngAfterViewInit() {

    this.renderer.listen(this.chartContainer.nativeElement, 'click', (evt) => {
      if (this.chartContainer.nativeElement.querySelectorAll('.list-item-2')) {
        [...  this.chartContainer.nativeElement.querySelectorAll('.list-item-2')].forEach(element => {
          element.addEventListener('click', this.openAlert);
        })
      }

    });


    // if (this.chartContainer.nativeElement.querySelector('#list-item-2')) {
    //   this.chartContainer.nativeElement.querySelector('#list-item-2').addEventListener('click', this.openAlert.bind(this));
    // }

  }



  updateChart() {
    if (!this.data) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeWidth(d => 200)
      .nodeHeight(d => 120)
      .nodeContent((data: any) => {
        return `
        <div class="node-card">
            <h6>${data.data.name}</h6>
        </div>
        <div class="menu" #menu>
          <ul class="list list-for-${data.data.id}">
            <li>
                Edit
            </li>
            <li class="list-item-2" department-id='${data.data.id}'>
           
            Add Sub-Department
            
             
             </li>
      
          </ul>
        </div>
        `;
      })
      .render();

    this.chart.onNodeClick((data: any) => {

      let all = document.getElementsByClassName(`list`);
      Array.from(all).forEach((el) => {
        // Do stuff here
        if (el.classList.contains(`list-for-${data}`)) {
          el.classList.remove('hide')
          el.classList.toggle('show');
        } else {
          el.classList.remove('show')
          el.classList.toggle('hide');
        }

      });


    });
    this.isDataLoaded = true;


  }


  private setData() {
    let allDepartMents = this.departmentService.getAllDepartment()
      .pipe(map(departmentResponse => {
        return departmentResponse.map((department: { [x: string]: any; }) => {
          if (department['parentId'] == 0) {
            department['parentId'] = '';
          }
          return department;
        });
      }));
    allDepartMents.subscribe(departmentNodes => {
      this.data = departmentNodes;
      this.updateChart();

    });
  }

  buildNodes(departments: any, root: any): any {
    if (root["visited"]) {
      return;
    }
    let internalNode: any = { "name": root["name"], "id": root["id"], "parentId": root["parentId"] };
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





}

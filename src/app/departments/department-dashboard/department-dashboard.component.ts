
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgChart } from 'd3-org-chart';
import { map } from 'rxjs';
import { DepartmentService } from 'src/app/services/departments.service';
@Component({
  selector: 'app-department-dashboard',
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DepartmentDashboardComponent implements OnInit {
  isDataLoaded: boolean = false;
  @ViewChild('chartContainer') chartContainer: ElementRef;

  @Input() data: any[];
  chart;

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2) {
    if (!this.chart) {
      this.chart = new OrgChart();

    }



  }

  ngOnInit() {
    this.setData();
  }

  handleDepartmentEvent(event: any) {
    let departmentId = event.currentTarget.attributes["department-id"]["nodeValue"];
    let eventType = event.currentTarget.attributes["event-type"]["nodeValue"];
    if (eventType == 'add') {
      this.navigate(departmentId);
    }
  }


  private navigate(departmentId: any) {
    this.router.navigate(['./create', departmentId], { relativeTo: this.route });
  }

  ngAfterViewInit() {

    this.renderer.listen(this.chartContainer.nativeElement, 'click', (evt) => {
      if (this.chartContainer.nativeElement.querySelectorAll('.list-item-2')) {
        [...  this.chartContainer.nativeElement.querySelectorAll('.list-item-2')].forEach(element => {
          element.addEventListener('click', this.handleDepartmentEvent.bind(this));
        })
      }

    });


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
        <div class="menu" #menu>
        <ul class="list list-for-${data.data.id}">

          <li class="list-item-2" department-id='${data.data.id}' event-type="add">
            Add 
          </li>
          <li class="list-item-2" department-id='${data.data.id}' event-type="edit">
              Edit
          </li>
          <li class="list-item-2" department-id='${data.data.id}' event-type="delete">
           Delete 
          </li>
    
        </ul>
      </div>
        <div class="node-card">
            <h6>${data.data.name}</h6>
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

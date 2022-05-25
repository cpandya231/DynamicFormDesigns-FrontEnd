
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
      this.router.navigate(['./create', departmentId], { relativeTo: this.route });
    } else if (eventType == 'edit') {
      this.router.navigate(['./edit', departmentId], { relativeTo: this.route });
    }


  }

  clickedOutside(event: any) {
    if (event.target.className.baseVal == "svg-chart-container") {
      let all = document.getElementsByClassName(`list`);
      Array.from(all).forEach((el) => {


        el.classList.remove('show');

      });
    }

  }



  ngAfterViewInit() {

    this.renderer.listen(this.chartContainer.nativeElement, 'click', (evt) => {
      if (this.chartContainer.nativeElement.querySelectorAll('.list-items')) {
        [...  this.chartContainer.nativeElement.querySelectorAll('.list-items')].forEach(element => {
          element.addEventListener('click', this.handleDepartmentEvent.bind(this));
        })
      }

      if (evt.target.className.baseVal == "svg-chart-container") {
        this.chartContainer.nativeElement.querySelector('.svg-chart-container').addEventListener('click', this.clickedOutside.bind(this));
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
      .siblingsMargin(d => 80)

      .nodeContent((data: any) => {
        return `
        <div class="menu" #menu>
        <ul class="list list-for-${data.data.id}">

          <li class="list-items" department-id='${data.data.name}' event-type="add">
            Add 
          </li>
          <li class="list-items" department-id='${data.data.name}' event-type="edit">
              Edit
          </li>

    
        </ul>
      </div>
        <div class="node-card">
            <h6>${data.data.name}</h6>
            <span>code: ${data.data.code}</span>
        </div>
      
        `;
      })
      .compact(false).render().fit().expandAll();

    this.chart.onNodeClick((data: any) => {

      let all = document.getElementsByClassName(`list`);
      Array.from(all).forEach((el) => {
        // Do stuff here
        if (el.classList.contains(`list-for-${data}`)) {
          el.classList.toggle('hide')
          el.classList.add('show');

        } else {
          el.classList.toggle('show')
          el.classList.add('hide');

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




}

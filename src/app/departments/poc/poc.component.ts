
import { AfterContentChecked, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';
@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PocComponent implements OnInit {

  @ViewChild('chartContainer') chartContainer: ElementRef;
  @Input() data: any[];
  chart;

  constructor(private renderer: Renderer2,) {
    if (!this.chart) {
      this.chart = new OrgChart();
    }



  }

  ngOnInit() {
    d3.csv(
      'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
    ).then(data => {
      this.data = data;
      this.updateChart();
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
        <div class="node-card">
            <h6>${data.data.name}</h6>
        </div>
        <div class="menu ">
          <ul class="list list-for-${data.data.id}">
            <li>
                Edit
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


    })


  }

  toggleMenu() {
    console.log("Toggled")
  }


}

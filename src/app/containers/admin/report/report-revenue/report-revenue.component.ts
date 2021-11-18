import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/core/service/report.service';

@Component({
  selector: 'app-report-revenue',
  templateUrl: './report-revenue.component.html',
  styleUrls: ['./report-revenue.component.css']
})
export class ReportRevenueComponent implements OnInit {
  date: Date = new Date();
  dataReport!: {
    revenues: number[],
    orderQty: number[]
  }

  chartOrder: any = {
    type: 'Line',
    data: [],
    options: {
      colors: ["#3ca5ff"]
    }
  }

  chartRevenue: any = {
    type: 'Bar',
    data: [],
    options: {
      colors: ["#3ca5ff"]
    }
  }

  constructor(
    private reportService: ReportService
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.reportService.getRevenue(this.date)
      .subscribe((resp: any) => {
        this.dataReport = JSON.parse(resp["data"]);

        this.chartOrder.data = this.dataReport.orderQty.map((x, index) => {
          return ['T' + (index + 1), x];
        })

        this.chartRevenue.data = this.dataReport.revenues.map((x, index) => {
          return ['T' + (index + 1), x];
        })
      }, error => {

      })
  }

  onSelect(event: any) {
    console.log(event);
  }

}

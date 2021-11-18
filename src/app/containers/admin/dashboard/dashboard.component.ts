import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/core/service/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date: Date = new Date();
  dataHighlight!: ReportHighlight

  chartStatus: any = {
    type: 'PieChart',
    data: [],
    options: {
      colors: ["#6bcc21", "#3ca5ff", "#0097a7", "#ffa924", "#e20606"],
      is3D: true
    }
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
    this.reportService.getHighlight(this.date)
      .subscribe((resp: any) => {
        this.dataHighlight = JSON.parse(resp["data"]);

        this.chartStatus.data = [
          ["Tạo mới", this.dataHighlight.OrderQtyByStatus[0]],
          ["Đã xác nhận", this.dataHighlight.OrderQtyByStatus[1]],
          ["Đang vận chuyển", this.dataHighlight.OrderQtyByStatus[2]],
          ["Đã hoàn thành", this.dataHighlight.OrderQtyByStatus[3]],
          ["Đã hủy", this.dataHighlight.OrderQtyByStatus[4]]
        ];

        this.chartOrder.data = this.dataHighlight.OrderQty.map((x, index) => {
          return ['T' + (index + 1), x];
        })

        this.chartRevenue.data = this.dataHighlight.Revenues.map((x, index) => {
          return ['T' + (index + 1), x];
        })
      }, error => {

      })
  }

  onSelect(event: any) {
    console.log(event);
  }

}

export interface ReportHighlight {
  TotalNewOrder: number;
  DailySales: number;
  TotalOrder: number;
  SalesRevenue: number;
  OrderQty: number[];
  OrderQtyByStatus: number[];
  Revenues: number[];
}

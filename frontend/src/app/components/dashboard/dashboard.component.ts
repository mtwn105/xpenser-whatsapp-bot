import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, BaseChartDirective],
  providers: [AuthService, DashboardService,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChildren(BaseChartDirective) chart: QueryList<BaseChartDirective<'bar' | 'pie'>> | undefined;
  // @ViewChild(BaseChartDirective) pieChart: BaseChartDirective<'pie'> | undefined;

  dashboardData: any = {}
  expenseChartData: any = {}
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      // : {
      //   anchor: 'end',
      //   align: 'end',
      // },
    },
    responsive: true,
    // maintainAspectRatio: true
  };
  expenseChartOptions: ChartData<'bar'> = {
    // title: {
    //   text: "Basic Column Chart in Angular"
    // },
    labels: [],
    datasets: [
      {
        label: 'Expense',
        data: [

        ]
        , backgroundColor: '#00d1b2',

      }
    ]
  };

  public categoryChartOptions: ChartConfiguration['options'] = {

    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      // datalabels: {
      //   formatter: (value, ctx) => {
      //     if (ctx.chart.data.labels) {
      //       return ctx.chart.data.labels[ctx.dataIndex];
      //     }
      //     return '';
      //   },
      // },
    },
    responsive: true,
    // maintainAspectRatio: true
  };
  categoryChartData: ChartData<'pie', number[], string | string[]> = {
    // title: {
    //   text: "Basic Column Chart in Angular"
    // },
    labels: [],
    datasets: [
      {
        data: [

        ],
        backgroundColor: [
          '#00d1b2',

        ]
      }

    ],

  };

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Generate random colors for the chart
  getRandomColors(numColors: number) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;
  }

  constructor(private router: Router, public authService: AuthService, private toasterService: ToasterService, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getDashboardOverview(this.authService.loggedInUser.id).subscribe(
      {
        next: (data) => {
          this.dashboardData = data;
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
    this.dashboardService.getDashboardExpenseChart(this.authService.loggedInUser.id).subscribe(
      {
        next: (data: any) => {
          this.expenseChartData = data;
          this.expenseChartOptions.labels = data.labels;
          this.expenseChartOptions.datasets[0].data = data.data;

          console.log(data);
          // console.log(this.expenseChartOptions);
          this.chart?.map((chart) => {
            chart.update();
          });
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
    this.dashboardService.getDashboardCategoryChart(this.authService.loggedInUser.id).subscribe(
      {
        next: (data: any) => {
          // this. = data;
          this.categoryChartData.labels = data.labels;
          this.categoryChartData.datasets[0].data = data.data;
          this.categoryChartData.datasets[0].backgroundColor = this.getRandomColors(data.data.length);
          console.log(data);
          // console.log(this.expenseChartOptions);
          this.chart?.map((chart) => {
            chart.update();
          });
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  createExpense() {
    this.router.navigate(['/expense']);
  }

}

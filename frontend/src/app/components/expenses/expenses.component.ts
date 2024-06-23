import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ExpenseService } from '../../services/expense.service';
import { ToasterService } from '../../services/toaster.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [FormsModule, CommonModule, NgOtpInputModule, ReactiveFormsModule],
  providers: [AuthService, ToasterService, ExpenseService],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  constructor(private router: Router, public authService: AuthService, private toasterService: ToasterService, private activatedRoute: ActivatedRoute, private expenseService: ExpenseService) { }

  expenses: any = [];
  expenseTable: any = [];
  selectedPage = 1;
  pages: any = [];

  ngOnInit() {
    this.expenseService.getExpensesByUser(this.authService.loggedInUser.id).subscribe({
      next: (res: any) => {

        if (res.length > 10) {
          this.expenseTable = res.slice(0, 10);
          for (let count = 0; count < res.length; count = count + 10) {
            if (count % 10 == 0) {
              this.expenses.push(res.slice(count, count + 10));
            } else {
              this.expenses.push(res.slice(count, res.length));
            }
          }

          console.log(this.expenses);

          for (let count = 0; count < this.expenses.length; count++) {
            this.pages.push(count + 1);
          }

        } else {
          this.expenses[0] = res;
          this.expenseTable = res;
        }

        // this.expenses = res;
      }, error: (err) => {
        this.toasterService.notify('Error fetching expenses', 'is-danger')
      }
    })
  }

  createExpense() {
    this.router.navigate(['/expense']);
  }

  previousPage() {
    if (this.selectedPage > 1) {
      this.selectedPage = this.selectedPage - 1;
      this.expenseTable = this.expenses[this.selectedPage - 1];
    }
  }

  nextPage() {
    if (this.selectedPage < this.pages.length) {
      this.selectedPage = this.selectedPage + 1;
      this.expenseTable = this.expenses[this.selectedPage - 1];
    }
  }

  goToPage(page: number) {
    this.selectedPage = page;
    this.expenseTable = this.expenses[page - 1];
  }


}

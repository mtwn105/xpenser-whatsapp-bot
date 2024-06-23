import { Component } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [FormsModule, CommonModule, NgOtpInputModule, ReactiveFormsModule],
  providers: [AuthService, ToasterService, ExpenseService],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {

  expense: any = {
    _id: null,
    description: '',
    amount: 0,
    date: new Date(),
    user: ''
  }

  expenseForm: FormGroup;

  isLoading = false;

  constructor(private router: Router, private authService: AuthService, private toasterService: ToasterService, private activatedRoute: ActivatedRoute, private expenseService: ExpenseService) {

    this.expenseForm = new FormGroup({
      _id: new FormControl(null),
      description: new FormControl('', [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      user: new FormControl(authService.loggedInUser?.id, [Validators.required]),
    })

    if (activatedRoute.snapshot.params['id']) {
      this.expenseService.getExpense(activatedRoute.snapshot.params['id']).subscribe({
        next: (res) => {
          this.expense = res;
          this.expense.date = this.expense.date.split("T")[0];
          this.expenseForm.patchValue(this.expense);
        }, error: (err) => {
          this.toasterService.notify('Error fetching expense', 'is-danger')
        }
      })
    }

  }

  ngOnInit() {
  }

  saveExpense() {
    if (!this.expenseForm.valid) {
      this.toasterService.notify('Please fill all the required fields', 'is-danger')
      return;
    }

    this.expense = this.expenseForm.value;

    console.log(this.expense);

    if (this.expense._id) {
      this.expenseService.updateExpense(this.expense).subscribe({
        next: (res) => {
          this.toasterService.notify('Expense updated successfully', 'is-success')
          this.router.navigate(['/expenses'])
        }, error: (err) => {
          this.toasterService.notify('Error updating expense', 'is-danger')
        }
      })
    } else {
      this.expenseService.createExpense(this.expense).subscribe({
        next: (res) => {
          this.toasterService.notify('Expense created successfully', 'is-success')
          this.router.navigate(['/expenses'])
        }, error: (err) => {
          this.toasterService.notify('Error creating expense', 'is-danger')
        }
      })
    }



  }

}

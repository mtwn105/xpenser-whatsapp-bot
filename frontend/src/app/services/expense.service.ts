import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  createExpense(expense: any) {
    return this.http.post(environment.backendUrl + '/api/expenses', expense);
  }

  updateExpense(expense: any) {
    return this.http.put(environment.backendUrl + '/api/expenses/' + expense._id, expense);
  }

  deleteExpense(expense: any) {
    return this.http.delete(environment.backendUrl + '/api/expenses/' + expense._id, expense);
  }
  getExpensesByUser(userId: any) {
    return this.http.get(environment.backendUrl + '/api/expenses/user/' + userId);
  }
  getExpense(expenseId: any) {
    return this.http.get(environment.backendUrl + '/api/expenses/' + expenseId);
  }


}

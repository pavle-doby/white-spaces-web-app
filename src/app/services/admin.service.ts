import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  public getAllCustomers(): Observable<any> {
    return this.http.get(`${API_URL}/api/auth/customers`);
  }

  public getAllOrders(): Observable<any> {
    return this.http.get(`${API_URL}/order/get-all`);
  }

  public getAllAdmins(): Observable<any> {
    return this.http.get(`${API_URL}/api/auth/admins`);
  }

  public editOrder(orderId: number, assigneeid: number, state: string) {
    return this.http.post(`${API_URL}/order/${orderId}/update`, {
      assignee_id: assigneeid,
      state: state,
    });
  }

  public editProduct(productId: number, price: number) {
    return this.http.post(`${API_URL}/product/${productId}/update`, {
      price: price,
    });
  }
}

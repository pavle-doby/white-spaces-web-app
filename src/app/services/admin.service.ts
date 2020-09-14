import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  public getAllAddons(): Observable<any> {
    return this.http.get(`${API_URL}/api/addons/all`, {
      withCredentials: true,
    });
  }

  public getAllPackages(): Observable<any> {
    return this.http.get(`${API_URL}/api/packages/all`, {
      withCredentials: true,
    });
  }

  public getAllCustomers(): Observable<any> {
    return this.http.get(`${API_URL}/api/auth/customers`, {
      withCredentials: true,
    });
  }

  public getAllOrders(): Observable<any> {
    return this.http.get(`${API_URL}/order/get-all`, { withCredentials: true });
  }

  public getAllBlogs(): Observable<any> {
    return this.http.get(`${API_URL}/blog/all`, { withCredentials: true });
  }

  public postBlog(
    html: string,
    creator: string = 'Natasa Nikolic',
    title: string = 'test'
  ): Observable<any> {
    return this.http.post(
      `${API_URL}/blog/add`,
      {
        text: html,
        image_links: null,
        youtube_link: null,
        additional_data: { blog_title: title },
      },
      { withCredentials: true }
    );
  }

  public editBlog(
    id: number,
    html: string,
    creator: string = 'Natasa Nikolic',
    title: string = 'test'
  ): Observable<any> {
    return this.http.post(
      `${API_URL}/blog/${id}/update`,
      {
        text: html,
        image_links: null,
        youtube_link: null,
        additional_data: { blog_title: title },
      },
      { withCredentials: true }
    );
  }

  public getAllAdmins(): Observable<any> {
    return this.http.get(`${API_URL}/api/auth/admins`, {
      withCredentials: true,
    });
  }

  public getOrder(id: number): Observable<any> {
    return this.http.get(`${API_URL}/order/get/${id}`, {
      withCredentials: true,
    });
  }

  public editOrder(orderId: number, assigneeid: number, state: string) {
    return this.http.post(
      `${API_URL}/order/${orderId}/update`,
      {
        assignee_id: assigneeid,
        state: state,
      },
      //{ withCredentials: true }
    );
  }

  public editProduct(productId: number, price: number) {
    return this.http.post(
      `${API_URL}/product/${productId}/update`,
      {
        price: price,
      },
      { withCredentials: true }
    );
  }
}

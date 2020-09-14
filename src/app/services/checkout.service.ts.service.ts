import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';
import { ShoppingCart } from 'src/models/ShopingCart.model';
import { AddOnVM } from 'src/models/AddOnVM.model';
import { PackageDTO } from 'src/models/PackageDTO.model';
import { Link } from 'src/models/Link.model';
import { AddOnDTO } from 'src/models/AddOnDTO';
import { OrderVM } from 'src/models/OrderVM.model';
import { MockShoppingCart } from '../mock-data';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  public uploadFile(file: File): Observable<Link> {
    const data = new FormData();
    data.append('file', file);

    return this.http.post<Link>(`${API_URL}/api/file/upload`, data);
  }

  public getAllPackages(): Observable<PackageDTO[]> {
    return this.http.get<PackageDTO[]>(`${API_URL}/api/packages/all`);
  }

  public getAllAddOns(): Observable<AddOnDTO[]> {
    return this.http.get<AddOnDTO[]>(`${API_URL}/api/addons/all`);
  }

  public getShoppingCart(): Observable<ShoppingCart> {
    const URL = `${API_URL}/shopping-cart/get-shopping-cart`;
    return of(MockShoppingCart);
    return this.http.get<ShoppingCart>(URL, {});
  }

  //TODO: Make DTO model
  public addAddOn(addOnVM: AddOnVM): Observable<any> {
    const URL = `${API_URL}/shopping-cart/add-product`;
    return this.http.post(URL, { ...addOnVM });
  }

  public createOrder(shopping_cart_id: number): Observable<unknown> {
    const data = new OrderVM({ shopping_cart_id: shopping_cart_id });
    const URL = `${API_URL}/api/order/create`;
    return this.http.post(URL, { ...data });
  }
}

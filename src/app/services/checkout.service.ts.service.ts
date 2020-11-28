import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../app.config';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { PackageDTO } from 'src/models/PackageDTO.model';
import { Link } from 'src/models/Link.model';
import { AddOnDTO } from 'src/models/AddOnDTO';
import { OrderVM } from 'src/models/OrderVM.model';
import { ProductVM } from 'src/models/ProductVM.model';
import { MockShoppingCart } from '../mock-data';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  public uploadFile(file: File): Observable<Link> {
    const token = LocalStorageService.Instance.AuthHeader;

    const data = new FormData();
    data.append('file', file);

    return this.http.post<Link>(`${API_URL}/api/file/upload`, data, {headers: {
      Authorization: ` Bearer ${token}`
    }});  
  }

  public getAllPackages(): Observable<PackageDTO[]> {
    return this.http.get<PackageDTO[]>(`${API_URL}/api/packages/all`);
  }

  public getAllAddOns(): Observable<AddOnDTO[]> {
    return this.http.get<AddOnDTO[]>(`${API_URL}/api/addons/all`);
  }

  public getShoppingCart(): Observable<ShoppingCart> {
    const token = LocalStorageService.Instance.AuthHeader;
    
    const URL = `${API_URL}/shopping-cart/get-shopping-cart`;
    return this.http.get<ShoppingCart>(URL, {headers: {
      Authorization: ` Bearer ${token}`
    }});
  }

  public addProduct(productVM: ProductVM): Observable<ShoppingCart> {
    const URL = `${API_URL}/shopping-cart/add-product`;
    return this.http.post<ShoppingCart>(URL, { ...productVM });
  }

  public updateProduct(productVM: ProductVM): Observable<ShoppingCart> {
    const token = LocalStorageService.Instance.AuthHeader;

    const URL = `${API_URL}/shopping-cart/update-product`;
    // return of(MockShoppingCart);
    return this.http.post<ShoppingCart>(URL, { ...productVM }, {headers: {
      Authorization: ` Bearer ${token}`
    }});
  }

  public deleteProduct(line_item_id: number): Observable<string> {
    const URL = `${API_URL}/shopping-cart/delete-product/${line_item_id}`;
    // return of('Line item is deleted');
    return this.http.delete<string>(URL);
  }

  public createOrder(shopping_cart_id: number): Observable<unknown> {
    const data: OrderVM = { shopping_cart_id: shopping_cart_id };
    const URL = `${API_URL}/order/create`;
    return this.http.post(URL, { ...data });
  }
}

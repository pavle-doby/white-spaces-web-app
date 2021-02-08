import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { PackageDTO } from 'src/models/PackageDTO.model';
import { Link } from 'src/models/Link.model';
import { AddOnDTO } from 'src/models/AddOnDTO';
import { OrderVM } from 'src/models/OrderVM.model';
import { ProductVM } from 'src/models/ProductVM.model';
import { BusyFlag } from 'src/models/BusyFlag.model';

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
    return this.http.get<ShoppingCart>(URL, {});
  }

  public addProduct(productVM: ProductVM): Observable<ShoppingCart> {
    const URL = `${API_URL}/shopping-cart/add-product`;
    return this.http.post<ShoppingCart>(URL, { ...productVM });
  }

  public updateProduct(productVM: ProductVM): Observable<ShoppingCart> {
    const URL = `${API_URL}/shopping-cart/update-product`;
    return this.http.post<ShoppingCart>(URL, { ...productVM });
  }

  public deleteProduct(line_item_id: number): Observable<string> {
    const URL = `${API_URL}/shopping-cart/delete-product/${line_item_id}`;
    return this.http.delete<string>(URL);
  }

  public createOrder(shopping_cart_id: number): Observable<unknown> {
    const data: OrderVM = { shopping_cart_id: shopping_cart_id };
    const URL = `${API_URL}/order/create`;
    return this.http.post(URL, { ...data });
  }

  public deleteImage(imgSrc: string): Observable<any> {
    const URL = `${API_URL}/api/file/delete`;
    return this.http.put(URL, {
      filename: imgSrc,
    });
  }

  public getBusyFlag(): Observable<BusyFlag> {
    const URL = `${API_URL}/api/busy-flag/get`;
    return this.http.get<BusyFlag>(URL);
  }
}

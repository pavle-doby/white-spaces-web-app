import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';
import { ShoppingCard } from 'src/models/ShopingCart.model';
import { AddOnVM } from 'src/models/AddOnVM.model';
import { PackageDTO } from 'src/models/PackageDTO.model';
import { Link } from 'src/models/Link.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  public uploadFloorPlan(file: File): Observable<Link> {
    const data = new FormData();
    data.append('file', file);
    
    return this.http.post<Link>(`${API_URL}/api/file/upload`, data);
  }

  //TODO: Make DTO model
  public getAllPackages(): Observable<PackageDTO[]> {
    return this.http.get<PackageDTO[]>(`${API_URL}/api/packages/all`);
  }

  //TODO: Make DTO model
  public getAllAddOns(): Observable<any> {
    return this.http.get(`${API_URL}/api/addons/all`);
  }

  public makeShopingCart(): Observable<ShoppingCard> {
    const URL = `${API_URL}/api/shopping-cart/get-shopping-cart`;
    return this.http.post<ShoppingCard>(URL, {});
  }

  //TODO: Make DTO model
  public addAddOn(addOnVM: AddOnVM): Observable<any> {
    const URL = `${API_URL}/api/shopping-cart/add-product`;
    return this.http.post(URL, { ...addOnVM });
  }
}

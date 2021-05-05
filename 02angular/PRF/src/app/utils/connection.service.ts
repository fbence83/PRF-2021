import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  greet(){
    return this.http.get(environment.serverUrl, {responseType: 'text', withCredentials: true}); //aszinkronitás
  }

  getProductList(){
    return this.http.get(environment.serverUrl+"product");
  }

  getBuyedProductList(){
    return this.http.get(environment.springUrl+"products");
  }

  getTransactions(){
    return this.http.get(environment.springUrl+"transactions");
  }

  addProduct(data: Object){
    return this.http.post(environment.springUrl+'product', data);
  }

  getProductById(data: Number){
    return this.http.get(environment.springUrl+"product?id="+data);
  }

  getProductByName(data: String){
    return this.http.get(environment.springUrl+"product_by_name?name="+data);
  }

  addTransaction(data: any){
    return this.http.post(environment.springUrl+"transaction", data);
  }

  getOrderedProducts(){
    return this.http.get(environment.springUrl+'products');
  }
}

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

  postProduct(data: any){
    return this.http.post(environment.springUrl+'product', data);
  }

  getOrderedProducts(){
    return this.http.get(environment.springUrl+'products');
  }
}

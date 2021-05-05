import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../utils/connection.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private connectionService: ConnectionService, private router: Router) {
    console.log(environment);
  }

  //fancy magic
  products: any[] = [];

  ngOnInit(): void {
    this.connectionService.getProductList().subscribe(data => {
      Object.values(data).forEach((element) => {
        this.products.push({name: element.name, price: element.price});
      })

      console.log(this.products);
    }, error => {
      console.log('Sorry we encountered an error: ', error);
    });
  }

  buyProduct(product: any){
    //itt kapjuk meg a termeket
    //ezt kene tovabb passzolni a java springnek
    this.connectionService.postProduct(product).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    })
    //console.log(product);
  }

  getOrderedProducts(){
    this.connectionService.getOrderedProducts().subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

}

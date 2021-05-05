import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../utils/connection.service';

@Component({
  selector: 'app-buyed-products',
  templateUrl: './buyed-products.component.html',
  styleUrls: ['./buyed-products.component.css']
})
export class BuyedProductsComponent implements OnInit {

  constructor(private connectionService: ConnectionService, private router: Router) {
    console.log(environment);
  }

  //fancy magic
  products: any[] = [];

  ngOnInit(): void {
    this.connectionService.getBuyedProductList().subscribe(data => {
      Object.values(data).forEach((element) => {
        this.products.push({name: element.name, price: element.price});
      })

      console.log(this.products);
    }, error => {
      console.log('Sorry we encountered an error: ', error);
    });
  }


  goToIndex(){
    this.router.navigate(['/index']);
  }

  goToProductList(){
    this.router.navigate(['/product-list']);
  }

  goToTransactions(){
    this.router.navigate(['/transactions']);
  }

}

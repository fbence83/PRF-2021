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


  goToIndex(){
    this.router.navigate(['/index']);
  }

  goToBuyedProducts(){
    this.router.navigate(['/buyed-products']);
  }

  goToTransactions(){
    this.router.navigate(['/transactions']);
  }


  createTransaction(data: any){
    console.log(data);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let actualDate = yyyy+"-"+mm+"-"+dd;
      
    let res = {
      transdate: actualDate,
      amount: data.price,
      productId: data.id
    }

    return res;
  }


  getProductName(product: any){
    let pName: String;
    pName = product.name;
    return pName;
  }


  buyProduct(product: Object){
    //itt kapjuk meg a termeket
    //ezt kene tovabb passzolni a java springnek
    console.log(product);
    this.connectionService.addProduct(product).subscribe(data => {
      
      //felvette a cikket a táblába
      if(data != null){
        let transaction = this.createTransaction(data);

        this.connectionService.addTransaction(transaction).subscribe(resp => {
          console.log(resp);

          
        }, err => {
          console.log(err);
        })

      //nem veszi fel a cikket mert már a táblában van, név alapján keressük  
      }else{
        let productName = this.getProductName(product);
        this.connectionService.getProductByName(productName).subscribe(respProduct => {
          console.log(respProduct);
          let transaction = this.createTransaction(respProduct);

          console.log(transaction);


          this.connectionService.addTransaction(transaction).subscribe(tResp => {
            console.log(tResp);
          }, tErr => {
            console.log(tErr);
          })
        }, er0 => {
          console.log(er0);
        })
      }

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

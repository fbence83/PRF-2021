import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../utils/connection.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private connectionService: ConnectionService, private router: Router) {
    console.log(environment);
  }

  //fancy magic
  transactions: any[] = [];

  ngOnInit(): void {
    this.connectionService.getTransactions().subscribe(data => {
      Object.values(data).forEach((element) => {
        this.connectionService.getProductById(element.productId).subscribe(res => {
          this.transactions.push({name: Object.values(res)[1], date: element.transdate, amount: element.amount});
        }, err => {
          console.log(err);
        })
        
      })

      console.log(this.transactions);
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

  goToBuyedProducts(){
    this.router.navigate(['/buyed-products']);
  }

}

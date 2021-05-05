import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../utils/connection.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private connectionService: ConnectionService, private router: Router) {
    console.log(environment);
  }


  title = 'PRF';

  goToSecond(){
    this.router.navigate(['/second','PRF', {message: this.title}]);
  }

  goToProductList(){
    this.router.navigate(['/product-list']);
  }

  goToBuyedProducts(){
    this.router.navigate(['/buyed-products']);
  }

  goToTransactions(){
    this.router.navigate(['/transactions']);
  }

  ngOnInit(): void {
  }

}

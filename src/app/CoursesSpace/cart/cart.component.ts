import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart.service";



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public courses : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getCourses()
    .subscribe((res)=>{
      this.courses = res;
      console.log(res)
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

  checkout() {
    this.cartService.saveOrder().subscribe(data => console.log(data))
  }
}

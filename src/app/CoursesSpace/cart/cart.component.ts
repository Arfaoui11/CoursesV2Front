import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart.service";
import {TokenService} from "../services/token.service";
import {User} from "../../core/model/User";



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public courses : any = [];
  public grandTotal !: number;
  currentUser: User;
  constructor(private cartService : CartService,private token: TokenService) {
    this.currentUser = this.token.getUser();


  }

  ngOnInit(): void {



    this.cartService.getCourses()
    .subscribe((res)=>{
      this.courses = res;
      console.log(res);
      this.grandTotal = this.cartService.getTotalPrice()

    });

  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

  checkout() {
    this.cartService.saveOrder(this.currentUser.id).subscribe(data => console.log(data))
  }
}

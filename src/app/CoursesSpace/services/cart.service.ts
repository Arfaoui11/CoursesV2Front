import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

const Cart = 'cart-list';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[];
  public coursesList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private http : HttpClient) { }




  getCourses(){
    const list = this.getCart();
    this.coursesList.next(list);
    return this.coursesList.asObservable();
  }

  saveOrder(): Observable<any> {
    return this.http.post<any>("http://localhost:4000/api/orgs",this.cartItemList)
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.coursesList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.saveCartList(this.cartItemList);
    const list = this.getCart();
    this.coursesList.next(list);

    console.log(this.coursesList);

    this.getTotalPrice();
    console.log(this.cartItemList)
  }

  public saveCartList(cart: any): void {
    window.sessionStorage.removeItem(Cart);

    window.sessionStorage.setItem(Cart,  JSON.stringify(cart));
  }
  public getCart(): any {
    return JSON.parse(<any>sessionStorage.getItem(Cart));
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.costs;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })

    this.saveCartList(this.cartItemList);
    const list = this.getCart();
    this.coursesList.next(list);
  }
  removeAllCart(){
    this.cartItemList = []
    this.saveCartList(this.cartItemList);
    const list = this.getCart();
    this.coursesList.next(list);

  }


}

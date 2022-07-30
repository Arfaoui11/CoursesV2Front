import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Formation} from "../../core/model/Formation";

const Cart = 'cart-list';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : Formation[] =[];
 // public coursesList = new BehaviorSubject<any>([]);
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

    const exist = this.cartItemList.filter(item => item.id == product.id);
    if (exist.length === 0)
    {
      this.cartItemList.push(product);
      this.saveCartList(this.cartItemList);
      const list = this.getCart();
      this.coursesList.next(list);
    }else {
      console.log(exist)
    }



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
    this.cartItemList= this.getCart();
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

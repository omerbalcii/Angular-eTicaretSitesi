import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { ShopService,Product } from 'src/app/shop.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input()
  product!: Product;
  

  @Output()
  productAdded =new EventEmitter<Product>();
  basket!:Product[];
  constructor(
    private shopService:ShopService
  ) { }

  ngOnInit(): void {
    this.basket=this.shopService.basket;
  }
  decreaseAmount(product:Product):void{

//ürün miktarı 0 olursa sepetten çıkar
//ürün miktarı 0 ise bir şey yapma  
if(product.quantity==0){
    return;
  }
  //ürün mikrtarı azalt

  product.quantity--;
  }
  increaseAmount(product: Product):void{
    
  //sepette yoksa ekle //ürrün miktarı arttır
  if(!this.basket.includes(product) ){
    this.basket.push(product);}
  this.addIfNotinBasket(product);
  
  product.quantity++;
  }
  removeIfzero(product:Product):void{
    if(product.quantity == 0){
      let index=this.basket.indexOf(product);
      this.basket.splice(index, 1);
    }
  }
  addIfNotinBasket(product:Product):void{
    if(!this.basket.includes(product) && product.quantity > 0){
        this.basket.push(product);
        this.productAdded.emit(product);
  }
}
  updateBasket(product:Product) : void{
   this.removeIfzero(product);
   this.addIfNotinBasket(product);
}

}

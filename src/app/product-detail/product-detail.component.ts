import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../products';
import { Product} from '../shop.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
   productId!:string;
   product?:Product ;
   relatedProducts:Product[]=[];
   
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paraMap=>{
    this.productId=paraMap.get("productId") as string;
    this.product=products.find(p=>p.id == Number(this.productId));
    this.relatedProducts=products.filter(p=> this.product?.related.includes(p.id));
    });
    
    
  }
 

}

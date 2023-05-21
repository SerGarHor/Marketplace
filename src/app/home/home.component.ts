import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import _ from 'lodash';
import { ShoppingcartComponent } from '../shoppingcart/shoppingcart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productData: any = []
  products: any = []
  productAll: any = []
  dataCart: any = []
  data: any = ''
  categorys: any = []
  countProducts: number = 0
  arrayProducts: any = []
  isLoading: boolean = false

  constructor(
    public service: ProductsService,
    private router: Router) {
      this.data = this.router.getCurrentNavigation()?.extras.state
     }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.isLoading = false
    forkJoin([this.service.getProductsPlatzi(), this.service.getProductsFake()]).subscribe((res: any) => {
      if (res) {
        res.forEach((element: any) => {
          element.forEach((data: any) => {
            const categoria = data.category.name ? data.category.name : data.category;
            if (!this.productData.hasOwnProperty(categoria)) {
              this.productData[categoria] = [];
              this.products[categoria] = [];
              this.categorys.push(categoria);
            }
            this.products[categoria].push(JSON.parse(JSON.stringify(data)))
            this.productData[categoria].push(data);
          });
        });
      }
        this.isLoading = true
    })
    if(this.data != '' && this.data != undefined){
      this.arrayProducts = this.data.data
      this.countProducts = this.data.data.length
    }
  }

  changeImg(data: any){
    return  data.images != undefined ? data.images[0] : data.image;
  }

  addCar(product: any){
    const existingProduct = this.arrayProducts.find((item : any) => item.id === product.id);
    if (existingProduct) {
      existingProduct.cant++
    } else {
      product.cant = 1
      this.arrayProducts.push(product);
    }
    this.countProducts++
  }

  applyFilter(event: any){
    this.categorys.forEach((element: any) => {
      this.productData[element] = this.products[element].filter((a: any) => a.title.toLowerCase().includes(event.value.toLowerCase()))
    })
  }

  applyFilterCategory(event: any){
      this.categorys.forEach((element: any) => {
        this.productData[element] = this.products[element].filter((a: any) => 
        a.category.name ?  a.category.name.includes(event.value || event.value.toLowerCase()) :  a.category.includes(event.value || event.value.toLowerCase()))
      })
  }

  navigateToComponent() {
    this.router.navigate(['/home/shoppingcart'],{ state: { data: this.arrayProducts } });
  }

}
